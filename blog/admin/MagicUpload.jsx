import { Rocket, Trash2, RefreshCw, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './MagicUpload.css';

const MagicUpload = () => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [images, setImages] = useState([]); // Array of base64 images (min 3, max 10)
    const [category, setCategory] = useState('Colour Trends & Decor');
    const [waterproofingIssue, setWaterproofingIssue] = useState('');
    const [areas, setAreas] = useState([]);
    const [surfaces, setSurfaces] = useState([]);

    const [loading, setLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');

    // Persistence on Mount
    React.useEffect(() => {
        const saved = localStorage.getItem('magicUploadDraft');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setTitle(data.title || '');
                setNotes(data.notes || '');
                setCategory(data.category || 'Colour Trends & Decor');
                setWaterproofingIssue(data.waterproofingIssue || '');
                setAreas(data.areas || []);
                setSurfaces(data.surfaces || []);

                // Convert old object format to new array format
                const savedImages = data.images || [];
                if (!Array.isArray(savedImages) && typeof savedImages === 'object') {
                    // Old format - convert to array
                    const imageArray = [];
                    if (savedImages.hero) imageArray.push(savedImages.hero);
                    if (savedImages.grid1) imageArray.push(savedImages.grid1);
                    if (savedImages.grid2) imageArray.push(savedImages.grid2);
                    if (savedImages.action) imageArray.push(savedImages.action);
                    setImages(imageArray);
                } else {
                    setImages(savedImages);
                }

                setGeneratedContent(data.generatedContent || '');
            } catch (e) { console.error("Failed to load draft"); }
        }
    }, []);

    // Save on Change (Debounced slightly by nature of React updates)
    React.useEffect(() => {
        // Exclude images/base64 from local storage to prevent QuotaExceededError
        const data = { title, notes, category, waterproofingIssue, areas, surfaces, generatedContent };
        try {
            localStorage.setItem('magicUploadDraft', JSON.stringify(data));
        } catch (e) {
            console.warn("Failed to save draft to localStorage:", e);
        }
    }, [title, notes, category, waterproofingIssue, areas, surfaces, generatedContent]);

    // Live Preview Helper
    const getPreviewContent = () => {
        if (!generatedContent) return '';
        let content = generatedContent;
        if (images.hero) content = content.replace('{{HERO_IMAGE}}', `<img src="${images.hero}" class="w-full h-64 object-cover rounded-xl mb-4" />`);

        // Grid Logic for Preview
        if (images.grid1 && images.grid2) {
            content = content.replace(/{{GRID_IMAGE_1}}.*{{GRID_IMAGE_2}}/,
                `<div class="grid grid-cols-2 gap-2 my-4"><img src="${images.grid1}" class="rounded-lg"/><img src="${images.grid2}" class="rounded-lg"/></div>`);
            content = content.replace('{{GRID_IMAGE_1}}', '').replace('{{GRID_IMAGE_2}}', '');
        } else if (images.grid1) {
            content = content.replace(/{{GRID_IMAGE_1}}.*{{GRID_IMAGE_2}}/, `<img src="${images.grid1}" class="rounded-lg my-4"/>`);
            content = content.replace('{{GRID_IMAGE_1}}', `<img src="${images.grid1}" class="rounded-lg my-4"/>`);
        }

        if (images.action) content = content.replace('{{ACTION_IMAGE}}', `<img src="${images.action}" class="w-full h-64 object-cover rounded-xl my-4" />`);

        // Cleanup placeholders
        return content.replace(/{{.*?}}/g, '');
    };

    const CATEGORIES = ['Colour Trends & Decor', 'Waterproofing Guides', 'Exterior Care', 'Wood & Metal Finishes', 'DIY & How-To', 'Product Spotlights'];
    const ISSUES = ['Dampness & Seepage', 'Roof Leakage', 'Cracks & Peeling', 'Fungal & Algae Growth', 'Efflorescence'];
    const AREA_OPTIONS = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Exterior / Façade', 'Home Office', 'Dining Room'];
    const SURFACE_OPTIONS = ['Interior Walls', 'Exterior Masonry', 'Wood Surfaces', 'Metal Surfaces', 'Roof/Terrace'];

    const toggleSelection = (item, currentList, setList) => {
        if (currentList.includes(item)) {
            setList(currentList.filter(i => i !== item));
        } else {
            setList([...currentList, item]);
        }
    };

    // Compress image before adding to state
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas for compression
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions (max 1024px width)
                    let width = img.width;
                    let height = img.height;
                    const maxWidth = 1024;

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw and compress (80% quality)
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(compressedDataUrl);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageAdd = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            const remainingSlots = 10 - images.length;

            if (remainingSlots <= 0) {
                alert('Maximum 10 images allowed');
                return;
            }

            // Limit files to available slots
            const filesToProcess = selectedFiles.slice(0, remainingSlots);
            if (selectedFiles.length > remainingSlots) {
                alert(`Added first ${remainingSlots} images to meet the 10 image limit.`);
            }

            try {
                // Process in parallel
                const newImages = await Promise.all(
                    filesToProcess.map(file => compressImage(file))
                );
                setImages(prev => [...prev, ...newImages]);
            } catch (error) {
                console.error('Error compressing images:', error);
                alert('Failed to process some images');
            }

            // Reset input
            e.target.value = '';
        }
    };

    const handleImageRemove = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleGenerate = async () => {
        if (images.length < 3) {
            alert('Please upload at least 3 images to generate a blog post.');
            return;
        }
        if (images.length > 10) {
            alert('Maximum 10 images allowed per blog post.');
            return;
        }

        setLoading(true);
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        try {
            const response = await fetch(`${API_BASE}/api/blog/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    notes,
                    images // Send all 4 images for GPT Vision analysis
                })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setGeneratedContent(data.content);
        } catch (err) {
            alert('Error generating blog: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!generatedContent || !title) return;

        // Basic confirmation
        const slugSuggestion = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const slug = prompt("Confirm URL Slug:", slugSuggestion);
        if (!slug) return;

        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

        try {
            const response = await fetch(`${API_BASE}/api/blog/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    notes,
                    content: generatedContent,
                    images, // Sends base64 strings
                    slug,
                    category,
                    waterproofingIssue,
                    areas,
                    surfaces
                })
            });

            const data = await response.json();
            if (data.success) {
                alert("🎉 Blog Post Published Successfully!");
                // Reset form or redirect
                // navigate('/blog/' + data.slug);
            } else {
                throw new Error(data.error || "Unknown error");
            }
        } catch (err) {
            alert("Failed to publish: " + (err.message || JSON.stringify(err)));
        }
    };

    const [existingPosts, setExistingPosts] = useState([]);

    // Fetch posts on mount
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Assuming posts.json is public or served via API. Ideally should use API.
            // Since we don't have a GET /api/blog/posts route explicitly shown but implied, let's try reading from the public posts.json if available or through an API.
            // Actually, best to add a GET route or just read the JSON file directly if we can? 
            // Wait, we can reuse the same route logic or just fetch the filtered posts.
            // Let's assume the user has a route or I should add one. 
            // I'll add a quick fetch to the posts.json path if it's in public, BUT `posts.json` is in `blog/data`.
            // Let's rely on importing it if possible? No, this is runtime.
            // I will add a GET /api/blog/all route in the backend next tool call to make this clean. 
            // For now, I will write the frontend logic assuming that route exists.
            const response = await fetch('http://localhost:3001/api/blog/all');
            const data = await response.json();
            setExistingPosts(data);
        } catch (e) {
            console.error("Failed to fetch posts", e);
        }
    };

    const handleDeletePost = async (slug) => {
        if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

        try {
            const response = await fetch(`http://localhost:3001/api/blog/delete/${slug}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                alert("Post deleted!");
                fetchPosts(); // Refresh list
            } else {
                alert("Failed: " + data.error);
            }
        } catch (e) {
            alert("Error deleting: " + e.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-cardLg overflow-hidden">
                {/* Header */}
                <div className="bg-brand-purple p-6 text-white flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-serif">✨ Magic Upload (Admin)</h1>
                        <p className="opacity-80">AI-Powered Blog Generator</p>
                    </div>
                    {/* ... */}
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Inputs */}
                    <div className="space-y-6">
                        {/* ... Existing Inputs ... */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Blog Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                                placeholder="e.g., 5 Ways to Waterproof Your Roof"
                                value={title}
                                onChange={(e) => {
                                    const newTitle = e.target.value;
                                    setTitle(newTitle);

                                    // Auto-select category based on keywords
                                    const lowerTitle = newTitle.toLowerCase();
                                    const categoryKeywords = {
                                        'Waterproofing Guides': ['waterproof', 'leak', 'seepage', 'damp', 'moisture', 'roof', 'terrace', 'crack', 'rain', 'fungal', 'algae', 'repair', 'patch', 'sealant'],
                                        'Wood & Metal Finishes': ['wood', 'metal', 'furniture', 'finish', 'polish', 'varnish', 'rust', 'iron', 'gate', 'enamel', 'cabinet', 'door', 'window', 'grill'],
                                        'Exterior Care': ['exterior', 'outside', 'facade', 'weather', 'rain', 'protection', 'sun', 'dust', 'climate', 'masonry'],
                                        'DIY & How-To': ['how to', 'diy', 'guide', 'tips', 'hack', 'step', 'tutorial', 'paint yourself', 'beginners'],
                                        'Product Spotlights': ['product', 'review', 'spotlight', 'launch', 'new', 'hero', 'best paint', 'comparison'],
                                        'Colour Trends & Decor': ['colour', 'color', 'trend', 'decor', 'interior', 'paint', 'shade', 'palette', 'design', 'style', 'room', 'living', 'bedroom', 'kitchen', 'hall', 'space', 'modern', 'classic']
                                    };

                                    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
                                        if (keywords.some(k => lowerTitle.includes(k))) {
                                            setCategory(cat);
                                            break; // Stop at first match (priority order depends on object traversal, usually insertion order or define specifically if critical)
                                        }
                                    }
                                }}
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes (Optional)</label>
                            <textarea
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                                rows="4"
                                placeholder="Any specific points to include..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        {/* Category Selection */}
                        <div>
                            <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Category</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none text-[13px]"
                                placeholder="e.g. Colour Trends & Decor"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        {/* Waterproofing Issue */}
                        <div>
                            <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Waterproofing Issue (Optional)</label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none text-[13px]"
                                value={waterproofingIssue}
                                onChange={(e) => setWaterproofingIssue(e.target.value)}
                            >
                                <option value="">None</option>
                                {ISSUES.map(issue => (
                                    <option key={issue} value={issue}>{issue}</option>
                                ))}
                            </select>
                        </div>

                        {/* Areas */}
                        <div>
                            <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Areas (Select Multiple)</label>
                            <div className="space-y-2">
                                {AREA_OPTIONS.map(area => (
                                    <label key={area} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={areas.includes(area)}
                                            onChange={() => toggleSelection(area, areas, setAreas)}
                                            className="w-4 h-4 text-brand-purple border-gray-300 rounded focus:ring-brand-purple"
                                        />
                                        <span className="text-[13px] text-gray-600">{area}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Surfaces */}
                        <div>
                            <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Surfaces (Select Multiple)</label>
                            <div className="space-y-2">
                                {SURFACE_OPTIONS.map(surface => (
                                    <label key={surface} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={surfaces.includes(surface)}
                                            onChange={() => toggleSelection(surface, surfaces, setSurfaces)}
                                            className="w-4 h-4 text-brand-purple border-gray-300 rounded focus:ring-brand-purple"
                                        />
                                        <span className="text-[13px] text-gray-600">{surface}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="form-section">
                            <h3 className="form-section-title">📸 Upload Images (Min: 3, Max: 10)</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                                Current: {images.length} image{images.length !== 1 ? 's' : ''}
                            </p>
                            <div className="image-upload-grid">
                                {/* Display uploaded images */}
                                {images.map((img, index) => (
                                    <div key={index} className="image-upload-box has-image">
                                        <img src={img} alt={`Image ${index + 1}`} className="image-preview" />
                                        <button
                                            onClick={() => handleImageRemove(index)}
                                            className="image-remove-btn"
                                            style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                background: 'red',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '24px',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                                lineHeight: '1'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                {/* Add new image button */}
                                {images.length < 10 && (
                                    <div className="image-upload-box">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageAdd}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="image-upload-content cursor-pointer">
                                            <ImageIcon className="image-upload-icon" />
                                            <span className="image-upload-text">Add Image {images.length + 1}</span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleGenerate}
                                disabled={loading || !title}
                                className="magic-btn magic-btn-primary flex-1"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        Generate Blog
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={!generatedContent || loading}
                                className="magic-btn magic-btn-success flex-1"
                            >
                                <Rocket size={20} />
                                Publish Post
                            </button>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div className="preview-panel">
                        <h3>📄 Live Preview</h3>
                        {generatedContent ? (
                            <div
                                className="preview-content"
                                dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
                            />
                        ) : (
                            <div className="preview-empty">
                                <p>👆 Fill in the details and click "Generate Blog" to see the preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Manage Section */}
            <div className="max-w-7xl mx-auto mt-8 bg-white rounded-2xl shadow-cardLg overflow-hidden p-8">
                <div className="manage-header">
                    <h2>📚 Manage Existing Posts</h2>
                    <button onClick={fetchPosts} className="p-2 text-gray-500 hover:text-brand-purple transition-colors">
                        <RefreshCw size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    {existingPosts.length === 0 ? (
                        <p className="text-gray-400 italic">No posts found.</p>
                    ) : (
                        existingPosts.map(post => (
                            <div key={post.slug} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                                        <img src={post.heroImage || 'https://via.placeholder.com/100'} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{post.title}</h3>
                                        <div className="text-xs text-gray-500 flex gap-2">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeletePost(post.slug)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Post"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MagicUpload;
