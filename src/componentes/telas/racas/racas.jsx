import { useState, useEffect } from "react";
import RacaContext from "./RacaContext";
import Tabela from "./Tabela";
import Form from "./Form";
import WithAuth from "../../seg/WithAuth";
import Autenticacao from "../../seg/Autenticacao";
import { useNavigate } from "react-router-dom";

function Racas() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", pesomaximo: "",
        sigla: ""
    });

    const recuperar = async codigo => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/racas/${codigo}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status);
                })
                .then(data => setObjeto(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        }
        catch (err) {
            console.log('caiu no erro do recuperar por codigo: ' + err);
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }


    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/racas`,
                {
                    method: metodo,
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    },
                    body: JSON.stringify(objeto)
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaRacas();
    }



    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaRacas = async () => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/racas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(data => setListaObjetos(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/racas/${objeto.codigo}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": Autenticacao.pegaAutenticacao().token
                            }
                        })
                        .then(response => response.json())
                        .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaRacas();
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
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

export default WithAuth(Racas);
