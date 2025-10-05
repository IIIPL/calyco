# Blog Testing Guide - Calyco Paints

## 🧪 Testing Your Blog Implementation

This guide helps you verify that the blog system is working correctly.

---

## Quick Test Checklist

### ✅ Development Server Running
- Server: `http://localhost:5173`
- Status: Running (if you see this guide, server is active)

---

## 🔍 Test Routes

### 1. Blog Homepage
**URL**: `http://localhost:5173/blogs`

**What to Check**:
- [ ] Page loads without errors
- [ ] Featured article displays with image
- [ ] Category filter buttons work
- [ ] All categories show correct post count
- [ ] Newsletter signup form visible
- [ ] Mobile responsive (resize browser)

**Expected Behavior**:
- Featured post shows "2025 Interior Design Trends" article
- Filter buttons change displayed posts
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile

---

### 2. Individual Blog Posts (Complete Articles)

#### Test Article 1: Sustainable Color Palettes
**URL**: `http://localhost:5173/blogs/2025-sustainable-color-palettes`

**What to Check**:
- [ ] Full article content displays
- [ ] Table of Contents appears in sidebar (desktop)
- [ ] Images load correctly
- [ ] Share buttons functional
- [ ] Breadcrumb navigation works
- [ ] Related posts section appears
- [ ] Newsletter signup (inline version)
- [ ] Meta tags in page source (View > Developer > View Source)

**Expected Content**:
- Title: "2025 Interior Design Trends: Sustainable Color Palettes"
- 4 main sections with images
- Read time: 8 MIN READ
- Gold accent category badge

#### Test Article 2: Complete Guide to Painting
**URL**: `http://localhost:5173/blogs/complete-guide-painting-interior-walls`

**What to Check**:
- [ ] All 6 sections render properly
- [ ] Product highlights display correctly
- [ ] Lists and formatting correct
- [ ] Table of contents scrolls to sections
- [ ] "Shop the Look" section shows products

**Expected Content**:
- Title: "Complete Guide to Painting Interior Walls: A Step-by-Step Tutorial"
- 6 detailed sections
- Read time: 12 MIN READ
- Multiple product callouts

#### Test Article 3: Color Psychology
**URL**: `http://localhost:5173/blogs/psychology-color-commercial-spaces`

**What to Check**:
- [ ] Professional tone maintained
- [ ] All 5 sections present
- [ ] Research citations included
- [ ] Images with captions

**Expected Content**:
- Title: "The Psychology of Color in Commercial Spaces"
- 5 sections covering retail, offices, healthcare
- Read time: 10 MIN READ

---

### 3. Category Pages

#### Design & Trends
**URL**: `http://localhost:5173/blogs/categories/design-trends`

**What to Check**:
- [ ] Category header with description
- [ ] Sticky navigation bar
- [ ] All Design & Trends posts display
- [ ] "Read Article" links work
- [ ] Card hover effects

**Expected Posts**: 3+ posts including "2025 Sustainable Color Palettes"

#### DIY Guides
**URL**: `http://localhost:5173/blogs/categories/diy-guides`

**Expected Posts**: 3+ posts including "Complete Guide to Painting Interior Walls"

#### Color Psychology
**URL**: `http://localhost:5173/blogs/categories/color-psychology`

**Expected Posts**: 3+ posts including "Psychology of Color in Commercial Spaces"

#### Products & Finish
**URL**: `http://localhost:5173/blogs/categories/products-finish`

**Expected Posts**: 3 posts

#### Home Inspiration
**URL**: `http://localhost:5173/blogs/categories/home-inspiration`

**Expected Posts**: 3 posts

---

## 🔎 SEO & Meta Tags Testing

### Check Meta Tags
1. Visit any complete article
2. Right-click > View Page Source
3. Search for these tags:

**Required Meta Tags**:
```html
<title>2025 Interior Design Trends: Sustainable Color Palettes | Calyco Paints</title>
<meta name="description" content="Discover the eco-conscious...">
<link rel="canonical" href="https://calycopaints.com/blogs/...">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="...">
<meta property="og:image" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">

<!-- JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  ...
}
</script>
```

---

## 📱 Mobile Responsiveness Testing

### Breakpoints to Test
1. **Mobile**: 375px width (iPhone SE)
2. **Tablet**: 768px width (iPad)
3. **Desktop**: 1440px width (MacBook Pro)

### How to Test
1. Open Chrome DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select different devices
4. Check:
   - [ ] Images scale properly
   - [ ] Text readable without zooming
   - [ ] Buttons touchable (44px minimum)
   - [ ] No horizontal scrolling
   - [ ] Navigation accessible
   - [ ] Table of contents adapts (collapses on mobile)

---

## 🎨 Component Testing

### ProductHighlight Component
**Where**: In article content sections with products

**Check**:
- [ ] Color swatch displays correctly
- [ ] Product name and price visible
- [ ] "View Product" button works
- [ ] Responsive layout (stacks on mobile)
- [ ] Gold background gradient

### RelatedPosts Component
**Where**: Bottom of each article

**Check**:
- [ ] Shows 3 related posts
- [ ] Correct category badges
- [ ] Images load
- [ ] Links navigate correctly
- [ ] Hover effects work

### ShareButtons Component
**Where**: Below article header

**Check**:
- [ ] All 5 social buttons present (FB, Twitter, LinkedIn, WhatsApp, Email)
- [ ] Copy link button works
- [ ] Alert appears when copying
- [ ] Opens share dialogs correctly

### TableOfContents Component
**Where**: Sidebar on desktop (article pages)

**Check**:
- [ ] Auto-generates from section headings
- [ ] Active section highlights while scrolling
- [ ] Smooth scroll to section on click
- [ ] Sticky positioning works
- [ ] Hidden on mobile (or collapsed)

### NewsletterSignup Component
**Where**: Two locations - inline in articles, footer after related posts

**Check**:
- [ ] Email input field works
- [ ] GDPR checkbox present
- [ ] Submit button functional
- [ ] Privacy policy link works
- [ ] Success message appears
- [ ] Both variants display correctly

### ShopTheLook Component
**Where**: After article content (if featured_products exist)

**Check**:
- [ ] Product carousel scrolls horizontally
- [ ] Arrow buttons work (desktop)
- [ ] Touch swipe works (mobile)
- [ ] Product cards display correctly
- [ ] Color swatches show proper colors
- [ ] "Shop Now" and "Add Sample" buttons

---

## ⚡ Performance Testing

### Load Time
- [ ] Initial page load < 3 seconds
- [ ] Images lazy load (scroll to see)
- [ ] No console errors (F12 > Console)
- [ ] Smooth scrolling and interactions

### Build Test
```bash
npm run build
```
**Expected**:
- ✅ Build succeeds in ~10-15 seconds
- No TypeScript/ESLint errors
- Bundle size warning is normal (code-split in production)

---

## 🐛 Common Issues & Solutions

### Issue: "Page not found" on blog routes
**Solution**: Clear cache, restart dev server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue: Images not loading
**Solution**: Check image paths in blogData.js match actual files in `/Assets/`

### Issue: Newsletter form doesn't submit
**Solution**: This is expected - no backend configured yet. Console.log shows the email.

### Issue: Share buttons don't open windows
**Solution**: Some browsers block popups. Right-click > Open in new tab.

### Issue: Table of Contents doesn't scroll
**Solution**: Check that section `id` attributes match in blogData.js

---

## 📊 Analytics Testing (Future)

When you add analytics:
- [ ] Track blog post views
- [ ] Track time on page
- [ ] Track scroll depth
- [ ] Track product clicks from blog
- [ ] Track newsletter signups
- [ ] Track social shares

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

### Content
- [ ] All 3 complete articles display correctly
- [ ] Images optimized and loading
- [ ] No Lorem Ipsum text
- [ ] All links functional
- [ ] Spelling/grammar checked

### SEO
- [ ] Meta titles unique (60-70 chars)
- [ ] Meta descriptions unique (150-160 chars)
- [ ] Canonical URLs correct
- [ ] Open Graph images present
- [ ] JSON-LD schema validates (use [Google Rich Results Test](https://search.google.com/test/rich-results))

### Functionality
- [ ] All routes navigate correctly
- [ ] Category filtering works
- [ ] Search works (if implemented)
- [ ] Newsletter form submits
- [ ] Social share buttons work
- [ ] Mobile navigation accessible

### Performance
- [ ] Build succeeds without errors
- [ ] Lighthouse score > 90 (run in Chrome DevTools)
- [ ] Images lazy load
- [ ] No console errors

### Accessibility
- [ ] All images have alt text
- [ ] Proper heading hierarchy (H1 > H2 > H3)
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works (Tab through page)
- [ ] Screen reader friendly (test with NVDA/JAWS)

---

## 🎯 Test Scenarios

### User Journey 1: Discover and Read Article
1. Land on homepage
2. Click "Blog" in navigation
3. See featured article
4. Click category filter
5. Find interesting post
6. Click "Read Article"
7. Scroll through content
8. Use table of contents to jump
9. Click product highlight
10. Share on social media
11. Subscribe to newsletter
12. Read related post

### User Journey 2: Search-Specific Topic
1. Google search: "sustainable paint colors 2025"
2. Click result (should rank well with SEO)
3. Read article
4. Browse related posts
5. Visit category page
6. Return to blog homepage

### User Journey 3: Product Discovery
1. Read blog article
2. See product highlight
3. Click "View Product"
4. Return to article
5. Scroll to "Shop the Look"
6. Browse products
7. Add sample to cart

---

## 📝 Testing Log Template

Copy this for your testing session:

```
Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

## Blog Homepage
- Loads correctly: ☐
- Featured post: ☐
- Category filters: ☐
- Mobile responsive: ☐

## Article Pages
- Sustainable Palettes: ☐
- Painting Guide: ☐
- Color Psychology: ☐

## SEO
- Meta tags present: ☐
- Schema.org markup: ☐
- Social share tags: ☐

## Components
- ProductHighlight: ☐
- RelatedPosts: ☐
- ShareButtons: ☐
- TableOfContents: ☐
- Newsletter: ☐
- ShopTheLook: ☐

## Issues Found:
1. _____________________
2. _____________________
3. _____________________

## Notes:
_________________________
_________________________
```

---

## 🚀 Next Steps After Testing

1. **Fix Issues**: Address any bugs found
2. **Add Content**: Write remaining 12 articles using templates
3. **Optimize Images**: Convert to WebP, compress
4. **Configure Analytics**: Add Google Analytics/Plausible
5. **Submit Sitemap**: To Google Search Console
6. **Social Sharing**: Test actual shares (not just buttons)
7. **Email Integration**: Connect newsletter to email service
8. **Deploy**: Push to production

---

## 📞 Support Resources

- **Templates**: See `BLOG_ARTICLE_TEMPLATES.md`
- **Summary**: See `BLOG_IMPLEMENTATION_SUMMARY.md`
- **Code Examples**: Check `src/pages/blogs/[slug].jsx`

**Testing Complete When**:
- ✅ All routes accessible
- ✅ No console errors
- ✅ Mobile responsive
- ✅ SEO tags present
- ✅ Components functional
- ✅ Ready for content addition

---

**Happy Testing! 🎉**
