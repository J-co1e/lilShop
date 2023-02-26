import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    tabList: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      }
    ],
    currentMenu: null,
    menu: []
  },
  mutations: {
    changeCollapse (state, value) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu (state, value) {
      if (value.name !== 'home') {
        state.currentMenu = value
        const result = state.tabList.findIndex(item => item.name === value.name)
        if (result == -1) {
          state.tabList.push(value)
        }
      } else {
        state.currentMenu = null
      }
    },
    closeTag (state, value) {
      const result = state.tabList.findIndex(item => item.name === value.name)
      state.tabList.splice(result, 1)
    },
    setMenu (state, value) {
      state.menu = value
      Cookie.set('menu', JSON.stringify(value))
    },
    clearMenu (state, value) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu (state, value) {
      if (!Cookie.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
    }
  },
  actions: {

  }
}