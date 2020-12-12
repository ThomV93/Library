function book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
      return this.title + " by " + this.author + ", " + this.pages + ", " + this.read;
    };
  };
  
  const book1 = new book("Bend Sinister", "Nabakov", "450", "not read yet");
  const book2 = new book("1984", "Orwell", "350", "read");
  console.log(book1.info());
  console.log(book2.info());