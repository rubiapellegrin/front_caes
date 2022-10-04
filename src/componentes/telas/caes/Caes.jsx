import { useState, useEffect } from "react";
import CaesContext from "./CaesContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Salas() {

    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", numero: "", descricao: "",
        capacidade: "", predio: ""
    });
    const [listaCaes, setListaCaes] = useState([]);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/caes/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/caes`,
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
        recuperaCaes();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaCaes = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/caes`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const recuperaRacas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/racas`)
            .then(response => response.json())
            .then(data => setListaCaes(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/caes/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json => setAlerta({
                            "status": json.status,
                            "message": json.message
                        }))
                recuperaCaes();
            } catch (err) {
                setAlerta({ "status": "error", "message": err })
            }
        }
    }

    useEffect(() => {
        recuperaCaes();
        recuperaRacas();
    }, []);

    return (
        <CaesContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaRacas, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange, listaCaes
            }
        }>
            <Tabela />
            <Form />

        </CaesContext.Provider>
    )

}

export default Salas;