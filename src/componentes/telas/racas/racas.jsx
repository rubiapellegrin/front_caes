import { useState, useEffect } from "react";
import RacaContext from "./RacaContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Racas() {

    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", pesomaximo: "",
        sigla: ""
    });

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/racas/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/racas`,
                {
                    method: metodo,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(objeto)
                }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
        }
        recuperaRacas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaRacas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/racas`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/racas/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json => setAlerta({
                            "status": json.status,
                            "message": json.message
                        }))
                recuperaRacas();
            } catch (err) {
                setAlerta({ "status": "error", "message": err })
            }
        }
    }

    useEffect(() => {
        recuperaRacas();
    }, []);

    return (
        <RacaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaRacas, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange
            }
        }>
            <Tabela />
            <Form />

        </RacaContext.Provider>
    )

}

export default Racas;