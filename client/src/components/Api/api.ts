import apisauce from 'apisauce'

// ? REST API functions to communicate with your database backend
// ? Machine IP - replace with your server's IP address; run `ifconfig` and take the first inet IP address (should be below ens32)
const machineIP = "127.0.0.1"
// const machineIP = "172.25.77.198"
const machinePort = "5000"
const api = apisauce.create({
    baseURL: `http://${machineIP}:${machinePort}`,
})

export async function registerUser(entry: any) {
    let res = await api.post("/sign-up", entry);
    console.log(res);

    return([res.ok, res.data])
}

export async function signInUser(entry: any) {
    let res = await api.get("/login", { "email": entry.email,
                                        "password": entry.password});

    return([res.ok, res.data])
}

export async function createProfile(entry: any) {
    let res = await api.post("/pet-sitters", entry);

    return([res.ok, res.data])
}

export async function createJob(entry: any) {
    let res = await api.post("/find-services", entry);

    return([res.ok, res.data])
}