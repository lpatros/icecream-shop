
const isTimeoutExceeded = (lastTime) => {

    const TIME_LIMIT = 10 * 60 * 1000; 

    const currentTime = new Date().getTime();
    return (currentTime - lastTime) > TIME_LIMIT;
}

const updateUserLastTime = (user, updatedTime) => {
    const updatedUser = {
        ...user,
        lastTime: updatedTime
    };
    sessionStorage.setItem('loggedUser', JSON.stringify(updatedUser));
}


export const isAuthenticated = () => {
    const user = sessionStorage.getItem('loggedUser');

    if (user) {
        const resExceeded = isTimeoutExceeded(JSON.parse(user).lastTime);

        if (!resExceeded) {

            const updatedTimeout = new Date().getTime();
            updateUserLastTime(JSON.parse(user), updatedTimeout);

            return true;
        }

        logout(true);
        return false;
    }
    
    return false;
}

export const getLoggedUser = () => {
    const user = sessionStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
}

// Alias para getCurrentUser
export const getCurrentUser = getLoggedUser;

export const logout = (expired = false) => {
    sessionStorage.removeItem('loggedUser');

    if (expired) {
        window.location.hash = '/admin/login?expired=true';
        return;
    }

    window.location.hash = '/admin/login';
}

export const requireAuth = () => {
    if (!isAuthenticated()) {
        window.location.hash = '/admin/login?expired=true';
        return false;
    }
    return true;
}

export const saveLoggedUser = (user) => {
    sessionStorage.setItem('loggedUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        lastTime: new Date().getTime()
    }));
}
