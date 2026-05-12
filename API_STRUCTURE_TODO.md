# API Structure TODO

تم إضافة هيكل الملفات فقط بدون ربط وبدون تنفيذ كود.

## الترتيب المقترح للكتابة

1. ابدأ بملف `lib/axios.js`.
2. بعده اكتب `providers/ReactQueryProvider.jsx`.
3. بعده اربط الـ provider في `app/layout.js` بنفسك لما تكون جاهز.
4. اكتب services العامة أولًا:
   - categories
   - products
   - brands
   - subcategories
5. بعد ذلك اكتب hooks الخاصة بـ React Query.
6. استخدم `useCategories` في Hero بدل array الثابتة.
7. بعد ما تثبت public APIs، ادخل على auth.
8. بعد auth اشتغل على cart و wishlist و addresses و orders.

## القاعدة المهمة

- أي بيانات جاية من API: React Query.
- أي بيانات تخص المستخدم محليًا مثل token/user: Auth Context.
- لا تعمل Context للـ products أو categories أو cart أو wishlist.
