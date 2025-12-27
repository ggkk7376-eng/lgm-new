import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";

export const ThemeSettings = defineDocumentType(() => ({
  name: "ThemeSetting",
  isSingleton: true,
  filePathPattern: "settings/theme.md",
  fields: {
    colorPrimary400: { type: "string", required: true },
    colorPrimary600: { type: "string", required: true },
    colorPrimary700: { type: "string", required: true },
  },
}));

const commonPageFields = {
  tabTitle: { type: "string", required: true },
  description: { type: "string" },
  keywords: { type: "string" },
} as const;

export const RootPage = defineDocumentType(() => ({
  name: "RootPage",
  isSingleton: true,
  filePathPattern: "pages/root.md",
  fields: {
    ...commonPageFields,
    title: { type: "string" },
  },
}));

export const AboutUsPage = defineDocumentType(() => ({
  name: "AboutUsPage",
  isSingleton: true,
  filePathPattern: "pages/about-us.md",
  fields: {
    ...commonPageFields,
    title: { type: "string", required: true },
  },
}));

export const OfferPage = defineDocumentType(() => ({
  name: "OfferPage",
  isSingleton: true,
  filePathPattern: "pages/offer.md",
  fields: {
    ...commonPageFields,
    title: { type: "string", required: true },
    noProducts: { type: "string", required: true },
  },
}));

export const ProductPage = defineDocumentType(() => ({
  name: "ProductPage",
  isSingleton: true,
  filePathPattern: "pages/product.md",
  fields: {
    ...commonPageFields,
    downloads: { type: "string", required: true },
    backToOffer: { type: "string" },
    notFound: { type: "string" },
  },
}));

export const GalleryPage = defineDocumentType(() => ({
  name: "GalleryPage",
  isSingleton: true,
  filePathPattern: "pages/gallery.md",
  fields: {
    ...commonPageFields,
    title: { type: "string", required: true },
    noRealizations: { type: "string", required: true },
  },
}));

export const RealizationPage = defineDocumentType(() => ({
  name: "RealizationPage",
  isSingleton: true,
  filePathPattern: "pages/realization.md",
  fields: {
    ...commonPageFields,
    backToGallery: { type: "string" },
  },
}));

export const ContactPage = defineDocumentType(() => ({
  name: "ContactPage",
  isSingleton: true,
  filePathPattern: "pages/contact.md",
  fields: {
    ...commonPageFields,
    title: { type: "string", required: true },
  },
}));

export const PrivacyPolicyPage = defineDocumentType(() => ({
  name: "PrivacyPolicyPage",
  isSingleton: true,
  filePathPattern: "pages/privacy-policy.md",
  fields: {
    ...commonPageFields,
    title: { type: "string", required: true },
  },
}));

export const CookiesPage = defineDocumentType(() => ({
  name: "CookiesPage",
  isSingleton: true,
  filePathPattern: "pages/cookies.md",
  fields: {
    ...commonPageFields,
    title: { type: "string", required: true },
  },
}));

export const NavBarComponent = defineDocumentType(() => ({
  name: "NavBarComponent",
  isSingleton: true,
  filePathPattern: "components/nav-bar.md",
  fields: {
    logoSrc: { type: "string", required: true },
    logoAlt: { type: "string", required: true },
  },
}));

export const BannerComponent = defineDocumentType(() => ({
  name: "BannerComponent",
  isSingleton: true,
  filePathPattern: "components/banner.md",
  fields: {
    imageSrc: { type: "string", required: true },
    imageAlt: { type: "string", required: true },
    imageHeight: { type: "number", required: true },
  },
}));

export const FiltersComponent = defineDocumentType(() => ({
  name: "FiltersComponent",
  isSingleton: true,
  filePathPattern: "components/filters.md",
  fields: {
    title: { type: "string", required: true },
  },
}));

export const FooterComponentLink = defineNestedType(() => ({
  name: "FooterComponentLink",
  fields: {
    title: { type: "string", required: true },
    href: { type: "string", required: true },
  },
}));

export const FooterComponent = defineDocumentType(() => ({
  name: "FooterComponent",
  isSingleton: true,
  filePathPattern: "components/footer.md",
  fields: {
    links: {
      type: "list",
      of: FooterComponentLink,
      required: true,
    },
    products: {
      type: "list",
      required: true,
      of: { type: "string" },
    },
    contact: {
      type: "markdown",
      required: true,
    },
    copyright: {
      type: "markdown",
      required: true,
    },
  },
}));

export const ProductType = defineDocumentType(() => ({
  name: "ProductType",
  filePathPattern: "product-types/*.md",
  fields: {
    name: { type: "string", required: true },
    products: { type: "list", of: { type: "string" }, default: [] },
  },
}));

const ProductImage = defineNestedType(() => ({
  name: "ProductImage",
  fields: {
    src: { type: "string", required: true },
    alt: { type: "string", required: true },
  },
}));

const ProductDownload = defineNestedType(() => ({
  name: "ProductDownload",
  fields: {
    name: { type: "string" },
    src: { type: "string", required: true },
  },
}));

export const Product = defineDocumentType(() => ({
  name: "Product",
  filePathPattern: "products/*.md",
  fields: {
    name: { type: "string", required: true },
    price: { type: "number", required: true },
    images: {
      type: "list",
      of: ProductImage,
      default: [],
    },
    downloads: {
      type: "list",
      of: ProductDownload,
      default: [],
    },
  },
}));

export const RealizationType = defineDocumentType(() => ({
  name: "RealizationType",
  filePathPattern: "realization-types/*.md",
  fields: {
    name: { type: "string", required: true },
    realizations: { type: "list", of: { type: "string" }, default: [] },
  },
}));

export const BeforeAfterImage = defineNestedType(() => ({
  name: "BeforeAfterImage",
  fields: {
    before: { type: "nested", of: ProductImage, required: true },
    after: { type: "nested", of: ProductImage },
  },
}));

export const Realization = defineDocumentType(() => ({
  name: "Realizations",
  filePathPattern: "realizations/*.md",
  fields: {
    name: { type: "string", required: true },
    images: {
      type: "list",
      required: true,
      of: BeforeAfterImage,
    },
  },
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [
    ThemeSettings,
    RootPage,
    AboutUsPage,
    OfferPage,
    ProductPage,
    GalleryPage,
    RealizationPage,
    ContactPage,
    PrivacyPolicyPage,
    CookiesPage,
    NavBarComponent,
    BannerComponent,
    FiltersComponent,
    FooterComponent,
    ProductType,
    Product,
    RealizationType,
    Realization,
  ],
});
