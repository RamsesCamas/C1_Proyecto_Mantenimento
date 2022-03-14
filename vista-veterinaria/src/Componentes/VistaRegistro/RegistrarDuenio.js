import React, {useState} from 'react'
import axios from 'axios';

export default function RegistrarDuenio(props) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const peticionPost = (url, duenio) => {
        axios.post(url, duenio).then(response => {
            // console.log(response)
            if (response.data){
                alert('Propietario registrado exitosamente');
                window.location.href = "/auth/login";
            }else{
                alert('Ha ocurrido un error al registrar el propietario');
            }
        })
    }
    const handleSubmit = (url) => {
        const duenio = {
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
            email: email,
            password: passwd
        }
        peticionPost(url, duenio)
    }
    const handleclick = () => {
        alert('Propietario registrado exitosamente');
    }
    return (
        <div>
            <div className="main">
                <div className="formRegistro">
                    <h2>Ingresar un nuevo usuario</h2>
                    <div className="divform">
                        <label>Nombre completo</label>
                        <input className='form-control texto' id='nombre' type="text" placeholder='Nombre'
                               onChange={e => setNombre(e.target.value)}/>
                    </div>

                    <div className="divform">
                        <label>Número telefónico</label>
                        <input className='form-control texto' id='telefono' type="text" placeholder='Telefono'
                               onChange={e => setTelefono(e.target.value)}/>
                    </div>

                    <div className="divform">
                        <label>Dirección</label>
                        <input className='form-control texto' id='direccion' type="text" placeholder='Dirección'
                               onChange={e => setDireccion(e.target.value)}/>
                    </div>

                    <div className="divform">
                        <label>Correo electrónico</label>
                        <input className='form-control texto' id='email' type="email" placeholder='email'
                               onChange={e => setEmail(e.target.value)}/>
                    </div>

                <div className="divform">
                        <label>Contraseña</label>
                    <input className='form-control texto' id='password' type="password" placeholder='Contraseña' onChange={e => setPasswd(e.target.value)}/>
                 </div>

                <div className="divform">
                    <label>Confirmar contraseña</label>
                    <input className='form-control texto' id='confirmPassword' type="password" placeholder='Confirmar Contraseña'/>
                </div>

                    <div className="divform" align="center">
                        <button className='btn btn-primary btn-lg' onClick={() => {
                            let cPasswd = document.getElementById('confirmPassword').value
                            if (nombre !== '' && telefono !== '' && direccion !== '' && email !== '' && passwd !== '' && cPasswd !== '') {
                                if (passwd === cPasswd) {
                                    handleSubmit('http://localhost:18081/user/owner/signup');
                                    // handleclick();
                                    document.getElementById('nombre').value = ''
                                    document.getElementById('telefono').value = ''
                                    document.getElementById('direccion').value = ''
                                    document.getElementById('email').value = ''
                                    document.getElementById('password').value = ''
                                    document.getElementById('confirmPassword').value = ''
                                } else alert('Las contaseñas ingresadas con coinciden')
                            } else alert('Llene todos los campos')
                        }}
                        > Ingresar nuevo usuario
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
