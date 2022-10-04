import http from "node:http"
import cluster from "cluster"
import { cpus } from "os"

const criarfilhos = () => {
    const processos = cpus().length
    console.log(`\nServidor iniciado com PID ${process.pid}\n`)
    console.log(`\nCriando ${processos} filhos\n`)
    for (let i = 0; i < processos; i++) {
        cluster.fork()
        
    }
}

const PORT = 8000

const iniciarfilho = () => {
    const server = http.createServer((req,res) => {
        res.writeHead(200) //ok
        res.end("home page do servidor")
    })

    server
    .listen(PORT)
    .on("listening", ()=> console.log(`\nProcesso ${process.pid} em http://localhost:${PORT}\n`))
}

if(cluster.isPrimary)
    criarfilhos()
else
    iniciarfilho()