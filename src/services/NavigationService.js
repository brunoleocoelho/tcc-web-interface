import { doLogout } from "./InterfaceService"

/**
 * Função que retorna titulo e menus para as páginas
 */
export const getNavData = () => ([
    { 
        label: "Dashboard",
        href: "/dashboard",
        icon: "home",
    },
    { 
        label: "Livros",
        href: "/livros",
        icon: "book",
    },
    // { 
    //     label: "Entregas",
    //     href:"",
    //     icon: "warning"
    // },
    // { 
    //     label: "Reservas",
    //     href:"",
    //     icon: "book"
    // },
    // { 
    //     label: "Favoritos",
    //     href:"",
    //     icon: "star"
    // },
    // { 
    //     label: "Histórico",
    //     href:"",
    //     icon: "history"
    // },
    { 
        label: "Temas e cores",
        href:"/temas-cores",
        icon: "paint-brush"
    },
    { 
        label: "Sobre",
        href: "/sobre",
        icon: "question",
    },
    { 
        label: "Sair",
        icon: "sign-out",
        onClick: doLogout
    },
])
