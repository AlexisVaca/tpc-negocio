const pgPromise = require("pg-promise")
const config = {
    host: "dpg-ccqvidaen0hs2ssasaa0-a.oregon-postgres.render.com",
    port: "5432",
    database: "negocio_6vvh",
    user: "kaulcuangot",
    password: "fcRB8SiJgRVOa65IHSDijlsyZOefq5aZ",
    ssl: true
}

const pgp = pgPromise({})
const db = pgp(config)

exports.db = db
