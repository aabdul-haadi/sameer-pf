import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  Plus, 
  Pencil, 
  Trash2, 
  Image, 
  Video, 
  FileImage, 
  Layers,
  X,
  Save,
  Home,
  Upload,
  Link as LinkIcon,
  Youtube,
  Info,
  Smartphone
} from 'lucide-react';
import { useAdmin, PortfolioItem } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';
import pfLogo from '@/assets/pf-logo-2.png';

type Category = 'logos' | 'posters' | 'shorts' | 'longvideos';
type MediaType = 'image' | 'video' | 'youtube';

const categoryIcons = {
  logos: Layers,
  posters: FileImage,
  shorts: Smartphone,
  longvideos: Video,
};

const categoryLabels = {
  logos: 'Logos',
  posters: 'Posters',
  shorts: 'YT Shorts',
  longvideos: 'Long Videos',
};

// Recommended sizes for each category
const categorySizeGuides: Record<Category, { width: string; height: string; description: string }> = {
  logos: { 
    width: '800px', 
    height: '800px', 
    description: 'Square format (1:1 ratio). Recommended: 800x800px or higher' 
  },
  posters: { 
    width: '800px', 
    height: '1200px', 
    description: 'Portrait format (2:3 ratio). Recommended: 800x1200px' 
  },
  shorts: { 
    width: '1080px', 
    height: '1920px', 
    description: 'Phone vertical format (9:16 ratio). Recommended: 1080x1920px' 
  },
  longvideos: { 
    width: '1920px', 
    height: '1080px', 
    description: 'Full HD video (16:9 ratio). Recommended: 1920x1080px' 
  },
};

// YouTube URL to thumbnail converter
function getYouTubeThumbnail(url: string): string | null {
  try {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout, portfolioData, updatePortfolioItem, addPortfolioItem, deletePortfolioItem, uploadMedia } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<Category>('logos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '',
    media_url: '',
    media_type: 'image' as MediaType,
    youtube_url: '',
    thumbnail_url: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out successfully' });
    navigate('/admin');
  };

  const openAddModal = () => {
    setEditingItem(null);
    // Default to youtube for shorts and longvideos
    const defaultMediaType = (activeCategory === 'shorts' || activeCategory === 'longvideos') ? 'youtube' : 'image';
    setFormData({ title: '', description: '', media_url: '', media_type: defaultMediaType, youtube_url: '', thumbnail_url: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, 
      description: item.description || '',
      media_url: item.media_url,
      media_type: item.media_type,
      youtube_url: item.youtube_url || '',
      thumbnail_url: item.thumbnail_url || ''
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadMedia(file, activeCategory);
      if (url) {
        setFormData((prev) => ({ 
          ...prev, 
          media_url: url,
          thumbnail_url: file.type.startsWith('video/') ? prev.thumbnail_url : url 
        }));
        toast({ title: 'File uploaded successfully' });
      } else {
        toast({ title: 'Upload failed', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleYouTubeUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, youtube_url: url }));
    
    // Auto-generate thumbnail
    const thumbnail = getYouTubeThumbnail(url);
    if (thumbnail) {
      setFormData((prev) => ({ 
        ...prev, 
        youtube_url: url,
        thumbnail_url: thumbnail,
        media_url: thumbnail 
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({ title: 'Please enter a title', variant: 'destructive' });
      return;
    }

    if (!formData.media_url.trim() && formData.media_type !== 'youtube') {
      toast({ title: 'Please upload or provide media', variant: 'destructive' });
      return;
    }

    if (formData.media_type === 'youtube' && !formData.youtube_url.trim()) {
      toast({ title: 'Please enter a YouTube URL', variant: 'destructive' });
      return;
    }

    setIsSaving(true);

    try {
      let success = false;
      
      if (editingItem) {
        success = await updatePortfolioItem({
          ...editingItem,
          title: formData.title,
          description: formData.description || null,
          media_url: formData.media_url,
          media_type: formData.media_type,
          youtube_url: formData.youtube_url || null,
          thumbnail_url: formData.thumbnail_url || null,
        });
        
        if (success) {
          toast({ title: 'Project updated successfully' });
        } else {
          toast({ title: 'Update failed', variant: 'destructive' });
        }
      } else {
        success = await addPortfolioItem({
          category: activeCategory,
          title: formData.title,
          description: formData.description || null,
          media_url: formData.media_url,
          media_type: formData.media_type,
          youtube_url: formData.youtube_url || null,
          thumbnail_url: formData.thumbnail_url || null,
        });
        
        if (success) {
          toast({ title: 'Project added successfully' });
        } else {
          toast({ title: 'Add failed', variant: 'destructive' });
        }
      }

      if (success) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', media_url: '', media_type: 'image', youtube_url: '', thumbnail_url: '' });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const success = await deletePortfolioItem(id);
      if (success) {
        toast({ title: 'Project deleted successfully' });
      } else {
        toast({ title: 'Delete failed', variant: 'destructive' });
      }
    }
  };

  const items = portfolioData[activeCategory];
  const CategoryIcon = categoryIcons[activeCategory];
  const sizeGuide = categorySizeGuides[activeCategory];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={pfLogo} alt="SAM-VISUALS" className="h-14 w-auto" />
            <h1 className="text-xl font-bold text-foreground">
              SAM<span className="text-primary">-VISUALS</span>
              <span className="text-muted-foreground font-normal ml-2">/ Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(categoryLabels) as Category[]).map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {categoryLabels[cat]}
                <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat ? 'bg-primary-foreground/20' : 'bg-background'
                }`}>
                  {portfolioData[cat].length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Size Guide Banner */}
        <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Recommended Size: {sizeGuide.width} × {sizeGuide.height}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{sizeGuide.description}</p>
          </div>
        </div>

        {/* Content Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CategoryIcon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">{categoryLabels[activeCategory]}</h2>
          </div>
          <button onClick={openAddModal} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-muted rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.thumbnail_url || item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.media_type === 'youtube' && (
                    <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Youtube className="w-3 h-3" />
                      YT
                    </div>
                  )}
                  {item.media_type === 'video' && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      Video
                    </div>
                  )}
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-3 rounded-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 rounded-full bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-foreground truncate">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground/60 mt-1 capitalize">{item.media_type}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <CategoryIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No {categoryLabels[activeCategory].toLowerCase()} added yet</p>
            <button onClick={openAddModal} className="btn-primary mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add First Project
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl p-6 w-full max-w-md border border-border shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {editingItem ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Size Guide in Modal */}
              <div className="mb-5 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Size:</strong> {sizeGuide.width} × {sizeGuide.height}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{sizeGuide.description}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Project Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter project title"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Description (Optional) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Description <span className="text-muted-foreground font-normal">(optional - shows on hover)</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Short description of the project..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                {/* Media Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Media Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['image', 'video', 'youtube'] as MediaType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, media_type: type }))}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                          formData.media_type === type
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {type === 'image' && <Image className="w-4 h-4" />}
                        {type === 'video' && <Video className="w-4 h-4" />}
                        {type === 'youtube' && <Youtube className="w-4 h-4" />}
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* YouTube URL (for youtube type) */}
                {formData.media_type === 'youtube' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">YouTube URL *</label>
                    <div className="relative">
                      <input
                        type="url"
                        value={formData.youtube_url}
                        onChange={(e) => handleYouTubeUrlChange(e.target.value)}
                        placeholder="https://youtube.com/watch?v=... or /shorts/..."
                        className="w-full px-4 py-3 pl-10 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {formData.thumbnail_url && (
                      <div className="mt-2 p-2 rounded-lg bg-muted/50 border border-border">
                        <p className="text-xs text-muted-foreground mb-2">Auto-generated thumbnail:</p>
                        <img 
                          src={formData.thumbnail_url} 
                          alt="YouTube thumbnail" 
                          className="w-full aspect-video object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* File Upload (for image/video types) */}
                {formData.media_type !== 'youtube' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Upload Media *</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={formData.media_type === 'image' ? 'image/*' : 'video/*'}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span>Click to upload {formData.media_type}</span>
                        </>
                      )}
                    </button>
                    {formData.media_url && (
                      <div className="mt-2 p-2 rounded-lg bg-muted/50 border border-border">
                        <p className="text-xs text-muted-foreground mb-2">Uploaded file:</p>
                        {formData.media_type === 'image' ? (
                          <img 
                            src={formData.media_url} 
                            alt="Uploaded" 
                            className="w-full max-h-40 object-contain rounded"
                          />
                        ) : (
                          <video 
                            src={formData.media_url} 
                            className="w-full max-h-40 rounded"
                            controls
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingItem ? 'Update' : 'Save'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
