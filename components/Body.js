const BodyComponent = {
  template: `
        <section class="articles" :style="styles">
          <article v-for="article in paginatedArticles">
            <h3>{{ article.title }}</h3>
            <p>{{ article.body }}</p>
            </article>
        </section>
        <div class="pagination">
        <p>Página {{ currentPage }} de {{ totalPages }}</p>
        <button @click="changePage(currentPage - 1)">Anterior</button>
        <button @click="changePage(currentPage + 1)">Siguiente</button>
        </div>
  `,
  // data es para inicializar variables
  // Se ejecuta solo una vez al montar la aplicacion
  data() {
    return {
      articles: [],
      currentPage: 1,
      windowWidth: window.innerWidth,
      styles: {
        height: "90vh",
        backgroundColor: "#eee",
        color: "#000",
        textAlign: "justify",
        padding: "10px",
      }
    };
  },
  // methods es para realizar acciones
  // Se ejecuta cada vez que se hace click en un boton
  methods: {
    async getArticles() {
      try {
        const respuesta = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const datos = await respuesta.json();
        this.articles = datos;
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },
    changePage(pageNumber) {
      if (pageNumber < 1) {
        this.currentPage = 1;
      } else if (pageNumber > this.totalPages) {
        this.currentPage = this.totalPages;
      } else {
        this.currentPage = pageNumber;
      }
    },
  },
  // computed es para realizar calculos
  // Se ejecuta cada vez que cambia un valor
  computed: {
    // Calculo para paginar los articulos dependiendo del tamaño de la pantalla y cantidad de articulos
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.articles.slice(startIndex, endIndex);
    },
    // Calculo para determinar la cantidad de paginas totales
    totalPages() {
      return Math.ceil(this.articles.length / this.pageSize);
    },
    // Cantidad de articulos por pagina dependiendo del tamaño de la pantalla
    pageSize() {
      if (this.windowWidth < 768) {
        return 5;
      } else if (this.windowWidth < 1200) {
        return 8;
      } else {
        return 10;
      }
    },
  },
  // watch o watchers son basicamente los observadores, estan pendiente de los eventos
  // Se ejecuta cada vez que cambia un valor
  watch: {
    windowWidth(newWidth) {
      this.totalPages = Math.ceil(this.articles.length / this.pageSize);
      if (this.totalPages !== this.totalPagesBefore) {
        this.currentPage = 1;
      }
      this.totalPagesBefore = this.totalPages;
    },
  },
  // monted es como el OnInit de angular, cuando se monte la aplicacion realizara la accion.
  mounted() {
    this.getArticles();
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  name: "BodyComponent",
};
export default BodyComponent;
