import { useContext } from "react";
import Alerta from "../../Alerta";
import CaesContext from "./CaesContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaCaes } =
        useContext(CaesContext);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <Dialogo id="modalEdicao" titulo="Cão" idform="formulario"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} tamanho={5}
                msgvalido=""
                msginvalido="" />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={50}
                msgvalido="Campo nome OK"
                msginvalido="Campo nome é obrigatório" />
            <CampoEntrada id="txtCliente" label="Cliente" tipo="text"
                name="cliente" value={objeto.cliente}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={40}
                msgvalido="Campo cliente OK"
                msginvalido="Campo cliente é obrigatório" />
            <CampoEntrada id="txtPeso" label="Peso"
                tipo="number"
                name="peso" value={objeto.peso}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={5}
                msgvalido="Campo peso OK"
                msginvalido="Campo peso é obrigatório" />
            <div className="form-group">
                <label htmlFor="selectRaca" className="form-label">
                    Raça
                </label>
                <select required className="form-control"
                    name="raca" value={objeto.raca} id="selectRaca"
                    onChange={handleChange}>
                    <option disable="true" value="">
                        (Selecione a raça)
                    </option>
                    {listaCaes.map((raca) => (
                        <option
                            key={raca.codigo} value={raca.codigo}>
                            {raca.nome}
                        </option>
                    ))
                    }
                </select>
                <div className="valid-feedback">
                    Campo raça OK
                </div>
                <div className="invalid-feedback">
                    Selecione uma raça
                </div>
            </div>
        </Dialogo>
    )
}

export default Form;