import Book from "../../model/Book";

export const booksListCurrentReading = {
  books: [
    {
      title: "MEAN Web Development",
      authors: ["Amos Q. Haviv"],
      publisher: "Packt Publishing Ltd",
      publishedDate: "2014-09-25",
      description:
        "If you are a web or a full-stack JavaScript developer who is interested in learning how to build modern web applications using the MEAN stack, this book is for you.",
      industryIdentifiers: [
        {
          type: "ISBN_13",
          identifier: "9781783983292",
        },
        {
          type: "ISBN_10",
          identifier: "1783983299",
        },
      ],
      readingModes: {
        text: true,
        image: true,
      },
      pageCount: 354,
      printType: "BOOK",
      categories: ["Computers"],
      averageRating: 5,
      ratingsCount: 2,
      maturityRating: "NOT_MATURE",
      allowAnonLogging: true,
      contentVersion: "1.1.1.0.preview.3",
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail:
          "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
      language: "en",
      previewLink:
        "http://books.google.com/books?id=FpifBAAAQBAJ&printsec=frontcover&dq=web+development&hl=&cd=1&source=gbs_api",
      infoLink:
        "https://play.google.com/store/books/details?id=FpifBAAAQBAJ&source=gbs_api",
      canonicalVolumeLink:
        "https://market.android.com/details?id=book-FpifBAAAQBAJ",
      id: "FpifBAAAQBAJ",
      shelf: "currentlyReading",
    },
  ],
};
export const booksListWant = {
  books: [
    {
      title: "MEAN Web Development",
      authors: ["Amos Q. Haviv"],
      publisher: "Packt Publishing Ltd",
      publishedDate: "2014-09-25",
      description:
        "If you are a web or a full-stack JavaScript developer who is interested in learning how to build modern web applications using the MEAN stack, this book is for you.",
      industryIdentifiers: [
        {
          type: "ISBN_13",
          identifier: "9781783983292",
        },
        {
          type: "ISBN_10",
          identifier: "1783983299",
        },
      ],
      readingModes: {
        text: true,
        image: true,
      },
      pageCount: 354,
      printType: "BOOK",
      categories: ["Computers"],
      averageRating: 5,
      ratingsCount: 2,
      maturityRating: "NOT_MATURE",
      allowAnonLogging: true,
      contentVersion: "1.1.1.0.preview.3",
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail:
          "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
      language: "en",
      previewLink:
        "http://books.google.com/books?id=FpifBAAAQBAJ&printsec=frontcover&dq=web+development&hl=&cd=1&source=gbs_api",
      infoLink:
        "https://play.google.com/store/books/details?id=FpifBAAAQBAJ&source=gbs_api",
      canonicalVolumeLink:
        "https://market.android.com/details?id=book-FpifBAAAQBAJ",
      id: "FpifBAAAQBAJ",
      shelf: "wantToRead",
    },
  ],
};
export const booksListNone = {
  books: [
    {
      title: "MEAN Web Development",
      authors: ["Amos Q. Haviv"],
      publisher: "Packt Publishing Ltd",
      publishedDate: "2014-09-25",
      description:
        "If you are a web or a full-stack JavaScript developer who is interested in learning how to build modern web applications using the MEAN stack, this book is for you.",
      industryIdentifiers: [
        {
          type: "ISBN_13",
          identifier: "9781783983292",
        },
        {
          type: "ISBN_10",
          identifier: "1783983299",
        },
      ],
      readingModes: {
        text: true,
        image: true,
      },
      pageCount: 354,
      printType: "BOOK",
      categories: ["Computers"],
      averageRating: 5,
      ratingsCount: 2,
      maturityRating: "NOT_MATURE",
      allowAnonLogging: true,
      contentVersion: "1.1.1.0.preview.3",
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail:
          "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
      language: "en",
      previewLink:
        "http://books.google.com/books?id=FpifBAAAQBAJ&printsec=frontcover&dq=web+development&hl=&cd=1&source=gbs_api",
      infoLink:
        "https://play.google.com/store/books/details?id=FpifBAAAQBAJ&source=gbs_api",
      canonicalVolumeLink:
        "https://market.android.com/details?id=book-FpifBAAAQBAJ",
      id: "FpifBAAAQBAJ",
      shelf: "read",
    },
  ],
};

export const mockFetch = (url: any) => {
  switch (url) {
    case "https://reactnd-books-api.udacity.com/books": {
      return Promise.resolve({
        json: async () => booksListCurrentReading,
      });
    }
    case "https://reactnd-books-api.udacity.com/search": {
      return Promise.resolve({
        json: async () => booksListWant,
      });
    }
    case "https://reactnd-books-api.udacity.com/FpifBAAAQBAJ": {
      return Promise.resolve({
        json: async () => booksListNone,
        ok: true,
        status: 200,
      });
    }
  }
};

export default mockFetch;
export const book1: Book = {
  title: "MEAN Web Development",
  authors: ["Amos Q. Haviv"],
  publisher: "Packt Publishing Ltd",
  publishedDate: "2014-09-25",
  description:
    "If you are a web or a full-stack JavaScript developer who is interested in learning how to build modern web applications using the MEAN stack, this book is for you.",
  industryIdentifiers: [
    {
      type: "ISBN_13",
      identifier: "9781783983292",
    },
    {
      type: "ISBN_10",
      identifier: "1783983299",
    },
  ],
  readingModes: {
    text: true,
    image: true,
  },
  pageCount: 354,
  printType: "BOOK",
  categories: ["Computers"],
  averageRating: 5,
  ratingsCount: 2,
  maturityRating: "NOT_MATURE",
  allowAnonLogging: true,
  contentVersion: "1.1.1.0.preview.3",
  panelizationSummary: {
    containsEpubBubbles: false,
    containsImageBubbles: false,
  },
  imageLinks: {
    smallThumbnail:
      "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    thumbnail:
      "http://books.google.com/books/content?id=FpifBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  language: "en",
  previewLink:
    "http://books.google.com/books?id=FpifBAAAQBAJ&printsec=frontcover&dq=web+development&hl=&cd=1&source=gbs_api",
  infoLink:
    "https://play.google.com/store/books/details?id=FpifBAAAQBAJ&source=gbs_api",
  canonicalVolumeLink:
    "https://market.android.com/details?id=book-FpifBAAAQBAJ",
  id: "FpifBAAAQBAJ",
  shelf: "currentlyReading",
  subtitle: "",
};
