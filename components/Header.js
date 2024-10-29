const HeaderComponent = {
  template: `
      <header class="header" :style="headerStyles">
          <nav>
          <ul :style="ulStyles">
              <li> <a v-for="link in links" :key="link.name" :href="link.url" :style="aStyles">{{ link.name }}</a></li>
          </ul>
          </nav>
      </header>
      `,
  data() {
    return {
      links: [
        { name: "Inicio", url: "/" },
        { name: "Acerca de", url: "/" },
        { name: "Contacto", url: "/" },
      ],
      headerStyles: {
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "10px",
      },
      ulStyles: {
        listStyle: "none",
        margin: "0",
        padding: "0",
        display: "flex",
        justifyContent: "center",
      },
      aStyles: {
        color: "#fff",
        padding: "5px",
      },
    };
  },
  name: "HeaderComponent",
};

export default HeaderComponent;
