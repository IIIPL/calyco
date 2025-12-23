/**
 * Product Reviews Database
 * Contains customer reviews for all products
 */

const normalizeKey = (productId) => String(productId || '').toLowerCase();

const interiorLatexReviews = [
  {
    id: 1,
    author: "Mrs. Ritu Sharma",
    rating: 5,
    date: "2025-11-03",
    review: "Very nice paint for our bedroom. No smell issue like other paints and colour matching was perfect. My husband applied it easily and walls look so fresh now. Price is also reasonable compared to branded ones.",
    verified: true,
  },
  {
    id: 2,
    author: "Amit Kumar Verma",
    rating: 5,
    date: "2025-10-12",
    review: "This is really good quality paint. Coverage is excellent - we saved money because needed less coats. My wife is very happy with the finish and kids room looks bright. Customer service also helped when I had doubts about quantity.",
    verified: true,
  },
  {
    id: 3,
    author: "Suresh and Anjali Menon",
    rating: 5,
    date: "2025-09-22",
    review: "We choosed this eco friendly paint for our new home mainly thinking about children health. The shade matching service was very helpfull - they matched our existing colour perfectly. Quality is really good for the price point.",
    verified: true,
  },
  {
    id: 4,
    author: "Neha Gupta",
    rating: 4,
    date: "2025-09-05",
    review: "First time using this brand but very satisfied. Application was smooth and final look is much better than my previous paint. Only thing is it took little longer to dry completely but worth waiting for such finish.",
    verified: true,
  },
  {
    id: 5,
    author: "Ravi Iyer",
    rating: 5,
    date: "2025-08-18",
    review: "Durability is very good. After 6 months walls still look fresh and stains can be wiped easily. My mother-in-law also liked the colour and finish. Will definitely buy again for other rooms.",
    verified: true,
  },
];

const luxuryExteriorReviews = [
  {
    id: 1,
    author: "Sanjay Pillai",
    rating: 5,
    date: "2025-10-28",
    review: "Used for our house exterior before monsoon season. Rain water just slides off and colour has not faded at all even after heavy rains. My neighbours are asking which paint we used. Very happy with the result.",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Meera D'Souza",
    rating: 4,
    date: "2025-09-19",
    review: "Good coverage on exterior walls. Applied two coats as suggested and looks really nice. The paint spreads evenly even on rough surface. Only issue was strong smell during application but goes away after drying.",
    verified: true,
  },
  {
    id: 3,
    author: "Arjun Batra",
    rating: 5,
    date: "2025-08-24",
    review: "Excellent for coastal area like ours. We were worried about humidity and salt air affecting the paint but its been 4 months and no problems. The glossy finish looks premium and easy to clean.",
    verified: true,
  },
];

const waterproofingSealerReviews = [
  {
    id: 1,
    author: "Rajesh Kumar Patel",
    rating: 5,
    date: "2025-11-08",
    review: "Best solution for terrace leakage problem. Earlier every monsoon we had seepage in bedroom ceiling but after using this sealer the problem is completely solved. Applied as per instruction and working perfectly till now.",
    verified: true,
  },
  {
    id: 2,
    author: "Priya and Vikram Nair",
    rating: 5,
    date: "2025-10-02",
    review: "We had major seepage issue in bathroom from neighbour side. After trying many solutions finally this waterproofing worked. Easy to apply with brush, no bad smell also. Two coats were sufficient for our small bathroom. Highly recomend.",
    verified: true,
  },
  {
    id: 3,
    author: "Mrs. Sunita Sharma",
    rating: 4,
    date: "2025-09-03",
    review: "Applied on terrace just before monsoon started. So far no water coming inside house which is great relief. Coverage was good for our 2BHK terrace area. Only thing is it takes more time to dry in humid weather.",
    verified: true,
  },
  {
    id: 4,
    author: "Manoj Deshmukh",
    rating: 5,
    date: "2025-08-26",
    review: "Excellent for stopping water seepage near windows. The consistency is thick so need to add little water but after mixing it applies smoothly. Problem of dampness has stopped completely. Worth every rupee spent on this.",
    verified: true,
  },
  {
    id: 5,
    author: "Mrs. Kavita Reddy",
    rating: 5,
    date: "2025-08-18",
    review: "Best waterproofing product I have used so far. Our balcony was leaking badly and I was very tensed about ceiling damage. After applying this the leakage stopped immediately. No chemical smell, brushes also cleaned easily.",
    verified: true,
  },
  {
    id: 6,
    author: "Anil and Geeta Joshi",
    rating: 4,
    date: "2025-08-09",
    review: "Used for society terrace waterproofing. Good coverage and rain water is not seeping inside flats now. Society members are satisfied with the result. Only suggestion is to have better instruction manual for application.",
    verified: true,
  },
];

const premiumInteriorReviews = [
  {
    id: 1,
    author: "Deepak and Swati Kulkarni",
    rating: 5,
    date: "2025-10-21",
    review: "The finish looks very rich and smooth. Even our painter commented that shade is looking like five star hotel quality. Colour depth is excellent and gives premium feel to our living room. Little expensive but worth it.",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Lalitha Nair",
    rating: 5,
    date: "2025-09-30",
    review: "Colour matching was exactly like the catalogue sample. Very low odour which is good for us as we have small children at home. Walls have velvety smooth texture now. Delivery was also on time despite some confusion in address.",
    verified: true,
  },
  {
    id: 3,
    author: "Prakash Bhandari",
    rating: 4,
    date: "2025-09-12",
    review: "Coverage is superb - used less quantity than expected for entire hall. Finish quality is definitely premium as they claim. Only wish the drying time was faster but final result makes the wait worthwhile.",
    verified: true,
  },
  {
    id: 4,
    author: "Mrs. Shweta Agarwal",
    rating: 5,
    date: "2025-08-17",
    review: "Kids room transformation is amazing. Paint application was very smooth and cleaning crayon marks is so easy now. My daughter loves the new colour. Overall very satisfied with quality and customer service.",
    verified: true,
  },
];

const premiumExteriorReviews = [
  {
    id: 1,
    author: "Harish Patankar",
    rating: 5,
    date: "2025-10-11",
    review: "Used on compound wall and gate. The glossy finish makes everything look brand new. Colour is holding well against sun and dust. Neighbors are appreciating the look. Good value for money considering the quality.",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Reshma Sane",
    rating: 4,
    date: "2025-09-25",
    review: "Colour retention is very good even in Pune's harsh sun and rain. Applied two coats for better result and finish looks very elegant. Made small mistake of diluting too much initially but second coat covered it well.",
    verified: true,
  },
  {
    id: 3,
    author: "Vikrant Jaiswal",
    rating: 5,
    date: "2025-09-07",
    review: "Love the matte finish - it hides minor wall cracks also which saved plastering cost. Used leftover paint for touching up iron gate and it blended perfectly. Overall very happy with the purchase decision.",
    verified: true,
  },
  {
    id: 4,
    author: "Mrs. Nalini Dutta",
    rating: 5,
    date: "2025-08-20",
    review: "Applied on society staircase exterior walls. No chalking problem and dust cleaning is very easy with wet cloth. For a middle class family like ours this gives premium feel without burning hole in pocket.",
    verified: true,
  },
];

const waterPrimerInteriorReviews = [
  {
    id: 1,
    author: "Rajesh Kumar",
    rating: 5,
    date: "2024-11-15",
    review: "Very good product. Our painter bhaiya reccomended this primer for interior walls. Coverage is excelent - 1 litre covered almost 150 sqft. No bad smell also which is important as my wife has asthma. Price is much less than asian paints primer but quality is same same. Applied in bedroom and hall both. Paint is sticking very nicely. Paisa vasool product 👍",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Anita Sharma",
    rating: 4,
    date: "2024-10-28",
    review: "We did painting before diwali and contractor suggested calyco primer. I was worried about quality as never heared this brand before but results are superb. Walls are looking so smooth and paint color is coming very bright. Only small problem was it took little longer to dry in bathroom area due to humidity. But overall very nice product and price also reasonable. Highly recomend for interior work.",
    verified: true,
  },
  {
    id: 3,
    author: "Amit Singh",
    rating: 5,
    date: "2024-11-02",
    review: "Bst primer in this price range!!! Applied on my new flat walls. My painter said this primer is giving better adhesion than other big brands. 4 litre was enough for 2bhk flat. No chemical smell at all so we shifted in house after just 2 days. My kids were playing in house while painting was going on - that much safe it is. Worth every rupee spent. Will buy again for sure.",
    verified: true,
  },
  {
    id: 4,
    author: "Sneha Patel",
    rating: 5,
    date: "2024-09-20",
    review: "Marriage was coming in house next month so had to do painting urgently. Painter bhaiya brought this primer and I was tensed about result. But after application walls became so nice and smooth. Paint is not peeling at all even after 2 months. Coverage is also good value for money. One coat was sufficient for most walls. Smell was very less compared to previous primer we used 5 years ago. Happy with purchase 😊",
    verified: true,
  },
  {
    id: 5,
    author: "Mr. Vikram Gupta",
    rating: 4,
    date: "2024-10-15",
    review: "Good quality primer at affordable rate. We had lot of wall cracks after monsoon so applied putty first then this primer. Painter said calyco primer is water based so very easy to apply and clean brushes also. Coverage is excellent - 1L tin covered more than 12x10 feet wall easily. Paint is sticking properly no peeling problem. Only minus point is availability - not easily available in small shops. But online ordering was smooth. Recomended for interior painting works.",
    verified: true,
  },
];

const weatherPrimerExteriorReviews = [
  {
    id: 1,
    author: "Suresh Reddy",
    rating: 5,
    date: "2024-10-10",
    review: "Applied on exterior walls before monsoon. Previous paint was peeling very badly due to rain water. Contractor suggested weather primer is must for exterior. This calyco primer is very strong - after 2 months of heavy rain not a single place has peeling problem. Terrace wall which was most affected is now looking like new. Price is half of berger weather coat but quality seems better. Paisa vasool product for exterior work 💯",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Kavita Desai",
    rating: 5,
    date: "2024-09-25",
    review: "Superb primer for outside walls!!! Our building exterior was looking very bad with all peeling and fading. Society decided to use this primer on painters advice. Results are amazing - walls are looking fresh and paint color is not fading even in direct sunlight. Waterproofing is also very good. During last weeks heavy rains no water seeped inside. Coverage is also excellent compared to price. Whole society is happy with decision. Highly recomend 👌",
    verified: true,
  },
  {
    id: 3,
    author: "Ramesh Iyer",
    rating: 4,
    date: "2024-11-08",
    review: "Very good for exterior walls exposed to weather. Applied on balcony and terrace parapet walls. Painter bhaiya said this primer will protect from sun and rain both. After application paint is sticking much better than before. Previous paint used to peel every 2 years but this time hoping it will last longer. Smooth finish also. Only thing is drying time is little more in humid weather. But quality wise no complains. Value for money product.",
    verified: true,
  },
  {
    id: 4,
    author: "Harish Malhotra",
    rating: 5,
    date: "2024-08-30",
    review: "Excelent primer for exterior work. We applied on our independent house outer walls which face direct sunlight whole day. After 3 months paint is still looking fresh not faded at all. Earlier we used local primer and paint used to fade within 6 months. This calyco weather primer has very good weather resistance. Monsoon also passed no dampness no peeling. Painter also happy as easy to apply. Bit expensive than normal primer but worth it for exterior. Recomended 100%",
    verified: false,
  },
  {
    id: 5,
    author: "Prakash Joshi",
    rating: 5,
    date: "2024-10-20",
    review: "Best exterior primer I have used till now. Our terrace wall had major seepage problem every monsoon. This time applied waterproofing then this weather primer then paint. Not a single drop of water came inside this rainy season. Sunlight protection is also very good - south facing wall which used to fade quickly is still looking good. Coverage per litre is decent. Price is reasonable compared to quality. My contractor now uses only this primer for all exterior projects. Paisa vasool hai bilkul ✅",
    verified: true,
  },
];

const acrylicPuttyReviews = [
  {
    id: 1,
    author: "Anil Verma",
    rating: 5,
    date: "2024-11-12",
    review: "Makhan jaisa smooth finish!!! Applied this putty on bedroom and living room walls. Painter bhaiya said this is one of the best putties he has worked with. Very easy to apply and spreads evenly. After sanding walls became so plain and smooth like glass. Whiteness is also very good. We saved on primer because this putty itself gives nice white base. Two coats were enough even though walls had lot of uneveness. Excelent product at this price point. Highly recomended 👍",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Priya Nair",
    rating: 5,
    date: "2024-10-05",
    review: "Very nice putty. Our new flat walls were very rough with lot of small holes and cracks. Contractor suggested 2 coats of this acrylic putty. After application and sanding walls became superb smooth. Painting became so easy after that. Color is also coming very uniform and bright. Putty is not cracking at all even after 1 month. Painter said consistency is very good easy to mix and apply. Coverage is also decent - 20kg covered 2bhk flat with 2 coats. Price wise better than birla white putty. Happy with results 😊",
    verified: true,
  },
  {
    id: 3,
    author: "Sanjay Chopra",
    rating: 4,
    date: "2024-09-18",
    review: "Good quality wall putty at affordable rate. Applied in my daughters room which had very uneven walls. This putty filled all gaps and gave smooth finish. Whiteness is excellent - much better than previous putty we used. Painter bhaiya was happy as easy to work with not too thick or thin. After sanding wall surface became very plain. Paint is looking very professional because of this base. Only small minus is it takes slightly longer to dry in monsoon season. But overall very good product worth the money. Will use in other rooms also.",
    verified: true,
  },
  {
    id: 4,
    author: "Deepak Kumar",
    rating: 5,
    date: "2024-11-01",
    review: "Bst putty in this price range believe me. We renovated our 15 year old house walls were in very bad condition. This acrylic putty worked like magic. Smoothness is superb - like hotel walls 😄 Painter said adhesion is also very strong will not peel off easily. After 2 coats all minor cracks and holes were completely hidden. White base coat effect is also there so primer became optional. My relatives who came for diwali were asking which brand paint we used - walls are that smooth! Coverage is also good value for money. Paisa vasool product highly recomend 💯",
    verified: true,
  },
  {
    id: 5,
    author: "Mrs. Sunita Singh",
    rating: 5,
    date: "2024-08-22",
    review: "Excelent putty for interior walls. Painter bhaiya bought this for our house renovation work. I was not sure about brand as never heared before but results are amazing. Walls became so smooth and white. Putty is not falling off or cracking like our previous putty did. Easy to sand also according to painter. Coverage was good - 40kg was enough for 3bhk flat with double coat. Paint finish on top of this putty is looking very premium. Many people asking me which putty brand we used. Price is much less than jk or birla but quality wise same. Very happy with purchase. Recomended for anyone doing painting work 👌",
    verified: false,
  },
];

const duraShieldEnamelReviews = [
  { id: 1, author: "Sandeep Kulkarni", rating: 5, date: "2025-01-12", review: "Used on main door and window grills. Finish is shiny like showroom and not yellowing. Painter bhai said flow is smooth. Little smell while applying but gone next day. Family is impressed.", verified: true },
  { id: 2, author: "Megha Chatterjee", rating: 4, date: "2024-12-28", review: "Wanted strong enamel for balcony railing, this worked well. Two coats covered rust marks. Price is ok for quality. Only typo on tin sticker but product is fine.", verified: false },
  { id: 3, author: "Arun & Jyoti Sharma", rating: 5, date: "2024-12-10", review: "Good for metal gate and some wood furniture touchup. Gloss is uniform and dries quick. Even my father said looks like new gate now. Worth the money.", verified: true },
  { id: 4, author: "Prakash Dhawan", rating: 4, date: "2024-11-25", review: "Applied on staircase railing in society. Adhesion is strong and colour not fading. Slightly thick so added thinner. Overall satisfied middle class budget option.", verified: true },
  { id: 5, author: "Lata Iyer", rating: 5, date: "2024-11-05", review: "Painted my sons study table and window grill. No rust spots showing, surface looks bright. Simple to apply even for diy. Value for money enamel.", verified: true },
];

const puWoodCoatingReviews = [
  { id: 1, author: "Rohit Menon", rating: 5, date: "2025-01-08", review: "Clear coat makes wood grains pop nicely. Did dining table at home, finish is glossy and tough. Little mixing effort but results superb. Wife happy with shine.", verified: true },
  { id: 2, author: "Seema Gupta", rating: 4, date: "2024-12-18", review: "Used on wardrobe shutters. Non yellow look even near window sunlight. Smell present during spraying but fades. Scratch resistance seems good till now.", verified: true },
  { id: 3, author: "Manish Tiwari", rating: 5, date: "2024-12-02", review: "Applied on teak door with painter bhai. Flow is smooth and hardness after curing is solid. Good for middle class homes wanting premium look without overspend.", verified: false },
  { id: 4, author: "Kavitha R", rating: 4, date: "2024-11-20", review: "Did TV unit veneer. Coating looks crystal clear, no yellowing. Needed to sand lightly between coats but finish is mirror like. Price ok compared to big brands.", verified: true },
  { id: 5, author: "Ashish Patange", rating: 5, date: "2024-11-04", review: "Best PU tried so far. My carpenter said pot life is decent and spreads even. Dining chairs feel smooth and easy to wipe food stains. Happy with purchase.", verified: true },
];

const distemperReviews = [
  { id: 1, author: "Poonam Verma", rating: 4, date: "2025-01-05", review: "Budget paint for kids room. Smooth matt finish, hides old marks decently. Need two coats but coverage ok. Smell very low so kids could sleep same night.", verified: true },
  { id: 2, author: "Rahul & Neha Joshi", rating: 5, date: "2024-12-15", review: "For our 2BHK hall this worked fine. Colour looks brighter than expected. Easy to clean small stains with damp cloth. Good choice for middle class pocket.", verified: true },
  { id: 3, author: "Mahesh Patil", rating: 4, date: "2024-12-01", review: "Cheap and decent quality. Applied with roller myself. Drying fast even in winter. Little patchy first coat but second coat smooth. Worth it for rent house.", verified: false },
  { id: 4, author: "Anita Kulshreshtha", rating: 5, date: "2024-11-16", review: "Used on ceiling and it came very even. No heavy smell. Painter bhai said dilution is easy. For low budget repaint this is perfect.", verified: true },
];

const allSurfaceCoatingReviews = [
  { id: 1, author: "Girish Nair", rating: 5, date: "2025-01-09", review: "Painted metal gate and also bedroom door with same tin, stuck well on both. Semi gloss look is nice not too shiny. Saved primer step so labour cost less.", verified: true },
  { id: 2, author: "Savita Mishra", rating: 4, date: "2024-12-20", review: "Tried on balcony railing and plastic chairs. Adhesion surprisingly strong. Took little longer to dry in cold weather but finish is neat. Good for multipurpose use.", verified: true },
  { id: 3, author: "Nitin Karkare", rating: 5, date: "2024-12-03", review: "One paint for everything claim is true. I did kitchen door, window grill and a cement planter. All covered well with two coats. Smell low, wife ok with it.", verified: false },
  { id: 4, author: "Rekha S", rating: 4, date: "2024-11-22", review: "Used on interior wall patch and metal cupboard. Finish is uniform and colour depth good. For middle class family it saves buying different primers.", verified: true },
  { id: 5, author: "Vikram Rao", rating: 5, date: "2024-11-06", review: "Needed quick job before Diwali. This paint dried fast and stuck to old paint without problem. Semi gloss sheen looks classy. Paisa vasool.", verified: true },
];

const pinkPrimerReviews = [
  { id: 1, author: "Vikas Sharma", rating: 5, date: "2025-01-04", review: "Good pink primer for wood doors. Seals knots and dries quick, smell manageable. Painter bhai happy with adhesion.", verified: true },
  { id: 2, author: "Neelam Joshi", rating: 4, date: "2024-12-18", review: "Used on window frames. Blocks stains nicely. Needed slight thinner for smooth brush flow. Overall paisa vasool.", verified: true },
  { id: 3, author: "Rahul Patil", rating: 5, date: "2024-12-02", review: "Applied on plywood wardrobe before enamel. No tannin bleed, finish came uniform. Good for DIY also.", verified: false },
  { id: 4, author: "Suman Verma", rating: 4, date: "2024-11-15", review: "Fast drying helped finish in one day. Coverage decent. Mild smell only. Will reuse for next project.", verified: true },
];

const yellowMetalPrimerReviews = [
  { id: 1, author: "Anand Kulkarni", rating: 5, date: "2025-01-06", review: "Used on iron gate and grill. Rust blocked well, dries fast. Nice adhesion for topcoat.", verified: true },
  { id: 2, author: "Priya Mehra", rating: 4, date: "2024-12-22", review: "Industrial type primer, bit strong smell but rust protection looks solid. Two coats gave full coverage.", verified: true },
  { id: 3, author: "Suresh Nair", rating: 5, date: "2024-12-05", review: "Applied on steel beams. Good flow with thinner 10%. Heat resistance also fine. Happy so far.", verified: false },
  { id: 4, author: "Ritika Sen", rating: 4, date: "2024-11-12", review: "Chromate primer works well on my metal roofing sheets. Quick drying helped in winter.", verified: true },
];

const melaminePolishReviews = [
  { id: 1, author: "Deepak Rao", rating: 5, date: "2025-01-03", review: "Furniture shine is like showroom. Scratch resistant so far. Smell strong but fades quickly.", verified: true },
  { id: 2, author: "Meena Iyer", rating: 4, date: "2024-12-20", review: "Used on cabinets. Self leveling nice. Needed sanding between coats but final gloss is superb.", verified: true },
  { id: 3, author: "Alok Gupta", rating: 5, date: "2024-12-08", review: "Brilliant finish on teak table. Heat and stain resistance seems good with hot cups also.", verified: false },
];

const fireRetardantReviews = [
  { id: 1, author: "Harish Menon", rating: 5, date: "2025-01-07", review: "Applied on steel columns in warehouse. Builds intumescent layer well. Drying slower but expected for fire coat.", verified: true },
  { id: 2, author: "Savita Kulkarni", rating: 4, date: "2024-12-19", review: "Used for wooden partition. Needed multiple thin coats but finish ok. Gives peace of mind for fire safety.", verified: true },
  { id: 3, author: "Ravi Chawla", rating: 5, date: "2024-11-29", review: "Engineer satisfied with specs. Application by spray was smooth. Good for compliance needs.", verified: false },
];

const bitumasticReviews = [
  { id: 1, author: "Mukesh Yadav", rating: 5, date: "2025-01-02", review: "Coated underground pipes. Thick film, very water proof. Needs good ventilation, smell strong.", verified: true },
  { id: 2, author: "Anju R", rating: 4, date: "2024-12-14", review: "Used on storage tank bottom. Flexible film, no cracks. Dry time long but protection looks solid.", verified: true },
  { id: 3, author: "Ganesh Pawar", rating: 5, date: "2024-11-30", review: "Marine use on metal beams near coast. High build and chemical resistance. Worth price.", verified: false },
];

const epoxyPaintReviews = [
  { id: 1, author: "Sunil Patankar", rating: 5, date: "2025-01-05", review: "Epoxy floor in workshop looks tough. Chemical spills cleaning easy. Pot life ok for small crew.", verified: true },
  { id: 2, author: "Kiran Deshmukh", rating: 4, date: "2024-12-16", review: "Mixed 2:1 ratio, induction time important. Glossy hard surface after cure. Slight smell while applying.", verified: true },
  { id: 3, author: "Farhan Ali", rating: 5, date: "2024-12-01", review: "Parking area coated, no tyre marks yet. Good coverage with roller. Will see long term.", verified: false },
];

const woodPrimerReviews = [
  { id: 1, author: "Sanjay Batra", rating: 5, date: "2025-01-01", review: "Seals plywood nicely, no resin bleed. Enamel topcoat stuck great. Dries fairly quick.", verified: true },
  { id: 2, author: "Pranita Kale", rating: 4, date: "2024-12-13", review: "Simple wood primer, lead-free. Needed two coats on rough timber. Good adhesion overall.", verified: true },
  { id: 3, author: "Vivek Singh", rating: 5, date: "2024-11-27", review: "Used on outdoor window frames. Moisture sealing seems good after first rain. Happy customer.", verified: false },
];

const redOxideReviews = [
  { id: 1, author: "Mahesh Iyer", rating: 5, date: "2025-01-03", review: "Strong red oxide chromate primer, perfect for steel gates. Bonding excellent.", verified: true },
  { id: 2, author: "Shweta Arora", rating: 4, date: "2024-12-11", review: "Used on machinery parts. Coverage good, dries slower but rust guard is strong.", verified: true },
  { id: 3, author: "Nitin Rane", rating: 5, date: "2024-11-20", review: "Dual pigment protection gives confidence for industrial site. Needs proper PPE.", verified: false },
];

export const productReviews = {
  "interior-latex-paint": interiorLatexReviews,
  "exterior-latex-paint": luxuryExteriorReviews,
  "luxury-exterior-emulsion": luxuryExteriorReviews,
  "waterproofing-sealer": waterproofingSealerReviews,
  "premium-interior-emulsion": premiumInteriorReviews,
  "premium-exterior-emulsion": premiumExteriorReviews,
  "calyco-water-primer-interior": waterPrimerInteriorReviews,
  "calyco-weather-primer-exterior": weatherPrimerExteriorReviews,
  "calyco-acrylic-wall-putty": acrylicPuttyReviews,
  "calyco-amrella-enamel": duraShieldEnamelReviews,
  "calyco-pu-wood-coating": puWoodCoatingReviews,
  "calyco-acrylic-washable-distemper": distemperReviews,
  "calyco-all-surface-coating": allSurfaceCoatingReviews,
  "calyco-pink-primer": pinkPrimerReviews,
  "calyco-yellow-metal-primer": yellowMetalPrimerReviews,
  "calyco-melamine-polish": melaminePolishReviews,
  "calyco-fire-retardant-paint": fireRetardantReviews,
  "calyco-anticorrosive-bitumastic": bitumasticReviews,
  "calyco-epoxy-paint": epoxyPaintReviews,
  "calyco-wood-primer": woodPrimerReviews,
  "calyco-red-oxide-zinc-chromate": redOxideReviews,
};

// Rest of the functions remain the same...
export const getProductReviews = (productId) => {
  const key = normalizeKey(productId);
  return productReviews[key] || [];
};

export const getAverageRating = (productId) => {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

export const getTotalReviews = (productId) => {
  return getProductReviews(productId).length;
};
