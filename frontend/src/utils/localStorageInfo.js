
export const setIsAuthenticated = (state) => localStorage.setItem('isAuthenticated', state ? 'true' : 'false')
export const getIsAuthenticated = localStorage.getItem('isAuthenticated')

export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user))
export const getUser = JSON.parse(localStorage.getItem('user'))

export const setUserRoleLogin = (role) => localStorage.setItem('userRoleLogin', JSON.stringify(role))
export const getUserRoleLogin = JSON.parse(localStorage.getItem('userRoleLogin'))






