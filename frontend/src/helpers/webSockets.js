import Pusher from "pusher-js";

const WebSockets = (token) => {
    return new Pusher("gwy1zVZnNchWGHoT6lR7XrykMfRDFKNX", {
        wsHost: "127.0.0.1",
        wsPort: 6001,
        cluster: "mt1",
        forceTLS: false,
        encrypted: true,
        disableStats: true,
        authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
        auth: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    });
}

export default WebSockets;
