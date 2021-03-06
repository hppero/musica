//dependencias
import React, { Component } from "react";
import { ReactMic } from "react-mic";
import Countdown from "react-countdown-now";
import axios from "axios";
import RingLoader from "react-spinners/ScaleLoader";
import FadeIn from "react-fade-in";

//imagenes
import f1 from "../../img/p1_img1.png";
import f2 from "../../img/p1_img2.png";
import f3 from "../../img/p1_img3.png";
import f4 from "../../img/p1_img4.png";
import f5 from "../../img/p1_img5.png";
import f6 from "../../img/p2_img1.png";
import f7 from "../../img/p2_img2.png";
import f8 from "../../img/p2_img3.png";
import f9 from "../../img/p2_1.png";
import f10 from "../../img/p2_2.png";
import f11 from "../../img/p2_3.png";
import f12 from "../../img/p2_4.png";
import f13 from "../../img/p2_5.png";
import f14 from "../../img/p2_bkg.png";
import f15 from "../../img/p2_sig.png";
import f16 from "../../img/p3_img1.png";
import f17 from "../../img/p3_img2.png";
import f18 from "../../img/p3_img3.png";
import f19 from "../../img/p3_sig.png";
import f20 from "../../img/btn_delete.png";
import f21 from "../../img/btn_record.png";
import f22 from "../../img/btn_stop.png";
import f23 from "../../img/p4_bkg.png";
import f24 from "../../img/p4_img1.png";
import f25 from "../../img/p4_img2.png";
import f26 from "../../img/p4_img3.png";
import f27 from "../../img/p4_sig.png";
import f28 from "../../img/p5_bkg.png";
import f29 from "../../img/p5_img1.png";
import f30 from "../../img/p5_img2.png";
import f31 from "../../img/p5_img3.png";
import f32 from "../../img/p5_sig.png";
import f33 from "../../img/p6_bkg.png";
import f34 from "../../img/p6_img1.png";
import f35 from "../../img/p6_sig.png";
import f36 from "../../img/reproducir.png";
//componentes
import "./Cancion.css";
import "./Cancion2.css";
import Alert from "../../modal/alert";

class CancionAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobObject: null,
      opcion: 0,
      archivo: "",
      blobURL: "",
      blobURL1: "",
      archivoab1: "",
      archivo1: "",
      blobURL2: "",
      archivoab2: "",
      archivo2: "",
      blobURL3: "",
      archivoab3: "",
      archivo3: "",
      blobURL4: "",
      isRecording: [false, false, false],
      isPaused: [false, false, false],
      botongrOn: [false, false, false],
      botonrec: [false, false, false],
      ifechaevo: [],
      seconds: 0,
      archivos: [3],
      onInicio: [false, false, false],
      showRecord: [false, false, false],
      onParar: [true, true, true],
      loading: false,
      mensajealerta: false,
      codigohash: "",
      activoOn: false,
      cancion: "",
      can1On: false,
      can2On: false,
      can3On: false,
      can4On: false,
      can5On: false,
      seconds1: 0,
      email: "",
      evolucionOn: false,
      tituloM: "",
      cuerpoM: "",
      retardo: [50, 200, 300],
      transicion: [10, 2000, 3000],
      contenedorOn: [true, false, false, false, false, false]
    };
  }

  limpiar = () => {
    const { blobURL, blobURL1, blobURL2, blobURL3 } = this.state;
    URL.revokeObjectURL(blobURL);
    URL.revokeObjectURL(blobURL1);
    URL.revokeObjectURL(blobURL2);
    URL.revokeObjectURL(blobURL3);
    this.setState({
      blobObject: null,
      opcion: 0,
      archivo: "",
      blobURL: "",
      blobURL1: "",
      archivo1: "",
      archivoab1: "",
      blobURL2: "",
      archivo2: "",
      archivoab2: "",
      archivoab3: "",
      blobURL3: "",
      archivo3: "",
      blobURL4: "",
      isRecording: [false, false, false],
      isPaused: [false, false, false],
      botongrOn: [false, false, false],
      botonrec: [false, false, false],
      ifechaevo: [],
      seconds: 0,
      archivos: [3],
      onInicio: [false, false, false],
      showRecord: [false, false, false],
      onParar: [true, true, true],
      loading: false,
      mensajealerta: false,
      codigohash: "",
      activoOn: false,
      cancion: "",
      can1On: false,
      can2On: false,
      can3On: false,
      can4On: false,
      can5On: false,
      seconds1: 0,
      evolucionOn: false,
      tituloM: "",
      cuerpoM: "",
      contenedorOn: [true, false, false, false, false, false],
      email: ""
    });
  };

  startOrPauseRecording = e => {
    //console.log(e)
    let index = parseInt(e.target.getAttribute("data-index"));
    //console.log(index)
    let {
      onInicio,
      onParar,
      isPaused,
      isRecording,
      botonrec,
      showRecord
    } = this.state;
    //console.log(onInicio)
    onInicio[index] = true;
    showRecord[index] = true;
    onParar[index] = false;
    this.setState({ onInicio, onParar, showRecord });
    if (isPaused[index]) {
      isPaused[index] = false;
      this.setState({ isPaused });
    } else if (isRecording[index]) {
      isPaused[index] = true;
      this.setState({ isPaused });
    } else {
      isRecording[index] = true;
      botonrec[index] = true;
      this.setState({ isRecording, botonrec });
    }
    //console.log(isRecording, onParar)
  };

  stopRecording = e => {
    //console.log(typeof e)
    let index = null;
    if (typeof e === "number") {
      index = e;
    } else {
      index = parseInt(e.target.getAttribute("data-index"));
    }

    let { isRecording, onInicio, onParar } = this.state;
    isRecording[index] = false;
    onInicio[index] = false;
    onParar[index] = true;
    this.setState({ isRecording, onInicio, onParar });
  };

  vaciarblob = e => {
    let index = parseInt(e.target.getAttribute("data-index"));
    //console.log(index)
    let {
      isRecording,
      isPaused,
      botongrOn,
      botonrec,
      onInicio,
      onParar
    } = this.state;
    isRecording[index] = false;
    isPaused[index] = false;
    botongrOn[index] = false;
    botonrec[index] = false;
    onInicio[index] = false;
    onParar[index] = true;
    this.setState({
      isRecording,
      isPaused,
      botongrOn,
      botonrec,
      onInicio,
      onParar
    });
    switch (index) {
      case 0:
        this.setState({
          blobURL1: "",
          archivo1: "",
          blobURL: "",
          blobObject: null
        });
        break;
      case 1:
        this.setState({
          blobURL2: "",
          archivo2: "",
          blobURL: "",
          blobObject: null
        });
        break;
      case 2:
        this.setState({
          blobURL3: "",
          archivo3: "",
          blobURL: "",
          blobObject: null
        });
        break;
    }
    this.setState({
      archivo: "",
      ifechaevo: [],
      seconds: 0
    });
  };

  onStop = (id, blobObject) => {
    console.log(id, blobObject);
    if (id === "audio1") {
      this.setState({ archivo1: blobObject });
    }
    if (id === "audio2") {
      this.setState({ archivo2: blobObject });
    }
    if (id === "audio3") {
      this.setState({ archivo3: blobObject });
    }
    let rw = "";
    // let global = this;
    let blobURL = blobObject.blobURL;
    // let request = new XMLHttpRequest();
    // request.open('GET', blobURL, true);
    // request.responseType = 'blob';
    // request.onload = function() {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(request.response);
    //     reader.onload = function(e){
    //         rw=e.target.result;
    //         // if (id==='audio1'){ global.setState({ archivo1:e.target.result })}
    //         // if (id==='audio2'){ global.setState({ archivo2:e.target.result })}
    //         // if (id==='audio3'){ global.setState({ archivo3:e.target.result })}

    //     }
    // };

    let botongrOn = this.state.botongrOn;
    if (blobURL.length > 0) {
      // console.log(id)
      switch (id) {
        case "audio1":
          botongrOn[0] = true;
          //console.log(archivo)
          this.setState({ blobURL1: blobURL, rw, botongrOn });
          break;
        case "audio2":
          botongrOn[1] = true;
          this.setState({ blobURL2: blobURL, rw, botongrOn });
          break;
        case "audio3":
          botongrOn[2] = true;
          this.setState({ blobURL3: blobURL, rw, botongrOn });
          break;
      }
    }
    // request.send();
  };

  Consultar = () => {
    if (this.state.evolucionOn === true) {
      this.setState({
        evolucionOn: false,
        ifechaevo: []
      });
    } else {
      if (this.state.email.length > 0) {
        axios
          .post(
            "https://fehensa.com.ve/cancion/grabarSonido.php/?email=" +
              this.state.email1 +
              "&boton=ConsultarFechas"
          )
          //console.log('https://fehensa.com.ve/cancion/grabarSonido.php/?email='+ this.state.email1 + '&boton=ConsultarFechas')
          .then(res => {
            if (res.data) {
              let xfechaevo = res.data;
              this.setState({
                loading: false,
                ifechaevo: xfechaevo,
                evolucionOn: true
              });
            } else {
              this.setState({
                loading: false,
                mensajealerta: true,
                tituloM: "Menu Unir Sonidos",
                cuerpoM: "No se encontraron Sonidos para este EMAIL Gracias."
              });
            }
          });
      } else {
        this.setState({
          mensajealerta: true,
          loading: false,
          tituloM: "Menu Unir Sonidos",
          cuerpoM: "Debe indicar un EMAIL Gracias."
        });
      }
    }
  };

  guardarSonido = () => {
    const {
      email,
      can1On,
      can2On,
      can3On,
      can4On,
      can5On,
      archivo1,
      archivo2,
      archivo3
    } = this.state;
    let pista = "";
    if (can1On) {
      pista = "Cancion1";
    }
    if (can2On) {
      pista = "Cancion2";
    }
    if (can3On) {
      pista = "Cancion3";
    }
    if (can4On) {
      pista = "Cancion4";
    }
    if (can5On) {
      pista = "Cancion5";
    }

    // var a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    // a.href = this.state.blobURL1;
    // a.download = "test.mp3";
    // a.click();

    // var a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    // a.href = this.state.blobURL2;
    // a.download = "test.mp3";
    // a.click();
    if (this.state.email.length > 0 && pista.length > 0) {
      let xdata = new FormData();
      console.log(this.state.archivo1);
      xdata.append("audio1", this.state.archivo1.blob, "audio1.mp3");
      xdata.append("name1", String(this.state.email));
      xdata.append("email", this.state.email);
      xdata.append("boton", "Guardar");
      xdata.append("pista", pista);
      let config = {
        headers: {
          "Content-Type": false
          // 'Content-Type' : 'multipart/form-data'
        }
      };
      const xurl = "https://fehensa.com.ve/cancion/grabarSonido.php";
      axios
        .post(xurl, xdata, config)

        .then(res => {
          if (res.data.variable1) {
            this.setState(
              {
                loading: false,
                contenedorOn: [true, false, false, false, false, false]
                // mensajealerta: true,
                // tituloM: 'Menu Unir Pistas',
                // cuerpoM: 'Los Audios se Guardaron con Exito',
              },
              this.limpiar()
            );
          } else {
            this.setState({
              loading: false,
              contenedorOn: [false, false, false, false, false, true]
              // loading:false,
              // mensajealerta: true,
              // tituloM: 'Menu Unir Pistas',
              // cuerpoM: 'Ocurrio un Problema 11Verifique.',
            });
          }
        });
    } else {
      this.setState({
        loading: false,
        mensajealerta: true,
        tituloM: "Menu Unir Pistas",
        cuerpoM: "Debe incluir un EMAIL y elejir una PISTA."
      });
    }
  };

  consultarSonido = e => {
    //console.log(e)
    //axios.post('https://fehensa.com.ve/consultorio/grabarSonido.php/?cedu=7146761&sonido=&boton=Consultar')
    //console.log('https://fehensa.com.ve/consultorio/grabarSonido.php/?cedu='+ this.state.cedupaciente +'&sonido=&boton=Consultar')
    let data = new FormData();
    data.append("email", e);
    data.append("boton", "Consultar");
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const xurl = "https://fehensa.com.ve/cancion/grabarSonido.php";
    axios.post(xurl, data, config).then(res => {
      //console.log("paso: "+res.data.variable1)
      if (res.data.variable1) {
        let index = 0;
        let audi1 = res.data.variable1;
        let audi2 = res.data.variable2;
        let audi3 = res.data.variable3;
        let pist = res.data.variable4;
        if (pist === "Cancion1") {
          this.cancionOn(1);
        }
        if (pist === "Cancion2") {
          this.cancionOn(2);
        }
        if (pist === "Cancion3") {
          this.cancionOn(3);
        }
        if (pist === "Cancion4") {
          this.cancionOn(4);
        }
        if (pist === "Cancion5") {
          this.cancionOn(5);
        }

        this.setState(
          {
            archivo1: audi1,
            archivo2: audi2,
            archivo3: audi3,
            blobURL1: audi1,
            blobURL1: audi1,
            blobURL2: audi2,
            blobURL3: audi3,
            evolucionOn: false
          },
          this.setState({ loading: false })
        );
      } else {
        this.setState({
          mensajealerta: true,
          tituloM: "Menu Unir Pistas",
          cuerpoM: "Ocurrio un Problema 22Verifique."
        });
      }
    });
  };

  eliminar = e => {
    //console.log(e)
    if (parseFloat(e) > 0) {
      axios
        .post(
          "https://fehensa.com.ve/cancion/grabarSonido.php/?email=" +
            e +
            "&boton=Eliminar"
        )
        .then(res => {
          if (res.data) {
            this.setState({
              evolucionOn: false,
              ifechaevo: [],
              mensajealerta: true,
              tituloM: "Menu Unir Sonido",
              cuerpoM: "Se elimino con exito el sonido."
            });
            this.spineractivar("consul");
          }
        });
    }
  };

  handleClose = () => {
    this.setState({ mensajealerta: false });
  };

  convertDataURIToBinary = dataURI => {
    let i = 0;
    let BASE64_MARKER = ";base64,";
    let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (i = 0; i < rawLength; i++) {
      if (i < 15000 || i > 18000) {
        array[i] = raw.charCodeAt(i);
      }
    }
    //console.log('iiiii',i)
    return array;
  };
  tiempo1 = () => {
    this.myInterval = setInterval(() => {
      const { seconds1, can1On, can2On, can3On, can4On, can5On } = this.state;

      if (seconds1 > 0) {
        this.setState(({ seconds1 }) => ({
          seconds1: seconds1 + 1
        }));
      }
      if (can1On) {
        if (seconds1 === 9) {
          this.grabar1();
        }
        if (seconds1 === 27) {
          this.grabar2();
        }
        if (seconds1 === 41) {
          this.grabar3();
          clearInterval(this.myInterval);
        }
      }
      if (can2On) {
        if (seconds1 === 10) {
          this.grabar1();
        }
        if (seconds1 === 20) {
          this.grabar2();
        }
        if (seconds1 === 38) {
          this.grabar3();
          clearInterval(this.myInterval);
        }
      }
      if (can3On) {
        if (seconds1 === 12) {
          this.grabar1();
        }
        if (seconds1 === 27) {
          this.grabar2();
        }
        if (seconds1 === 41) {
          this.grabar3();
          clearInterval(this.myInterval);
        }
      }
      if (can4On) {
        if (seconds1 === 10) {
          this.grabar1();
        }
        if (seconds1 === 20) {
          this.grabar2();
        }
        if (seconds1 === 29) {
          this.grabar3();
          clearInterval(this.myInterval);
        }
      }
      if (can5On) {
        if (seconds1 === 9) {
          this.grabar1();
        }
        if (seconds1 === 23) {
          this.grabar2();
        }
        if (seconds1 === 33) {
          this.grabar3();
          clearInterval(this.myInterval);
        }
      }
    }, 1000);
  };

  grabar1 = () => {
    const audioG = document.getElementById("out1");
    audioG.play();
  };
  grabar2 = () => {
    const audioG = document.getElementById("out2");
    audioG.play();
  };
  grabar3 = () => {
    const audioG = document.getElementById("out3");
    audioG.play();
    this.setState({ efectos1On: false, efectos2On: false, efectos3On: false });
  };

  onComplete(index) {
    this.stopRecording(index);
    setTimeout(() => {
      let showRecord = this.state.showRecord;
      showRecord[index] = false;
      this.setState({ showRecord });
    }, 1000);
  }

  cancionOn = e => {
    //console.log(e);
    let nombrearchi = "";
    if (e === 1) {
      nombrearchi = "AUDIO1.mp3";
      this.setState({
        can1On: true,
        can2On: false,
        can3On: false,
        can4On: false,
        can5On: false
      });
    }
    if (e === 2) {
      nombrearchi = "AUDIO2.mp3";
      this.setState({
        can1On: false,
        can2On: true,
        can3On: false,
        can4On: false,
        can5On: false
      });
    }
    if (e === 3) {
      nombrearchi = "AUDIO3.mp3";
      this.setState({
        can1On: false,
        can2On: false,
        can3On: true,
        can4On: false,
        can5On: false
      });
    }
    if (e === 4) {
      nombrearchi = "AUDIO4.mp3";
      this.setState({
        can1On: false,
        can2On: false,
        can3On: false,
        can4On: true,
        can5On: false
      });
    }
    if (e === 5) {
      nombrearchi = "AUDIO5.mp3";
      this.setState({
        can1On: false,
        can2On: false,
        can3On: false,
        can4On: false,
        can5On: true
      });
    }
    this.setState({
      cancion: nombrearchi
    });
  };

  onChange = e => {
    // console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  spineractivar = (e, i) => {
    if (this.state.loading === true) {
      this.setState({
        loading: false
      });
    } else {
      this.setState({
        loading: true
      });
      if (e === "tabla") {
        this.consultarSonido(i);
      }
      if (e === "almacenar") {
        this.guardarSonido();
      }
      if (e === "consul") {
        this.Consultar();
      }
      if (e === "guardarsonido") {
        this.guardarSonido();
      }
    }
  };

  crearblobfinal = () => {
    let {
      blobURL1,
      blobURL4,
      archivo1,
      archivo2,
      archivo3,
      archivoab1,
      archivoab2,
      archivoab3
    } = this.state;
    this.setState({ seconds1: 1 });
    this.tiempo1();
    const audioP = document.getElementById("out0");
    audioP.play();

    //var blob= new Blob(data, {type : 'audio/mp3'}); // el blob;
  };

  conteneaccion = e => {
    let { contenedorOn, showRecord } = this.state;
    switch (e) {
      case "0":
        if (this.state.email.length > 1) {
          contenedorOn[0] = false;
          contenedorOn[1] = true;
          this.setState({ contenedorOn });
        }
        break;
      case "1":
        if (this.state.cancion.length > 1) {
          contenedorOn[1] = false;
          contenedorOn[2] = true;
          // showRecord[0]='true' ,showRecord
          this.setState({ contenedorOn });
        }
        break;
      case "2":
        if (this.state.blobURL1.length > 1) {
          contenedorOn[2] = false;
          contenedorOn[3] = true;
          this.setState({ contenedorOn });
        }
        break;
      case "3":
        if (this.state.blobURL2.length > 1) {
          contenedorOn[3] = false;
          contenedorOn[4] = true;
          this.setState({ contenedorOn });
        }
        break;
      case "4":
        if (this.state.blobURL3.length > 1) {
          contenedorOn[4] = false;
          contenedorOn[5] = true;
          this.setState({ contenedorOn });
        }
        break;
      case "5":
        contenedorOn[5] = false;
        contenedorOn[6] = true;
        this.setState({ contenedorOn });
        break;
      case "4":
        contenedorOn[6] = false;
        contenedorOn[1] = true;
        this.setState({ contenedorOn });
        break;
    }
  };

  render() {
    const {
      transicion,
      retardo,
      mensajealerta,
      cancion,
      blobURL1,
      blobURL3,
      blobURL2,
      blobURL4,
      isRecording,
      isPaused,
      seconds
    } = this.state;
    console.log(this.state.showRecord[0]);
    return (
      <div className="principal row">
        {this.state.contenedorOn[0] === true && (
          <div className="contenedor1" id="p1">
            <div className="p1img1">
              <img src={f1} />
            </div>
            <div className="p1img2">
              <img src={f2} />
            </div>
            <div className="p1inicio">
              <img className="btn" src={f5} />
              <form id="form">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="Tu correo electrónico"
                    aria-describedby="emailHelp"
                    required="required"
                    name="email"
                    autoComplete="off"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
              </form>
              <img
                className="btn"
                src={f4}
                id="sig1"
                onClick={this.conteneaccion.bind(this, "0")}
              />
            </div>
          </div>
        )}

        {this.state.contenedorOn[1] === true && (
          <div className="contenedor2" id="p2">
            <div className="p2img1">
              <img src={f6} />
            </div>
            <div className="p2img2">
              <img src={f7} />
            </div>
            <div className="p2info">
              <img className="titulo" src={f8} />
              <div className="linea">
                <div className="btn">
                  <img
                    src={f9}
                    id="btn1"
                    onClick={this.cancionOn.bind(this, 1)}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f10}
                    id="btn1"
                    onClick={this.cancionOn.bind(this, 2)}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f11}
                    id="btn1"
                    onClick={this.cancionOn.bind(this, 3)}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f12}
                    id="btn1"
                    onClick={this.cancionOn.bind(this, 4)}
                  />
                </div>
                <div className="btn">
                  <img
                    id="btn1"
                    onClick={this.cancionOn.bind(this, 5)}
                    src={f13}
                  />
                </div>
              </div>
              <div className="linea1">
                <audio
                  className="output"
                  id="output"
                  ref=""
                  controls="controls"
                  src={cancion}
                ></audio>
              </div>
              <img
                className="sig"
                src={f15}
                id="sig2"
                onClick={this.conteneaccion.bind(this, "1")}
              />
            </div>
          </div>
        )}

        {this.state.contenedorOn[2] === true && (
          <div className="contenedor3" id="p3">
            <div className="p3img1">
              <img src={f16} />
            </div>
            <div className="p3img2">
              <img src={f17} />
            </div>
            <div className="p3info">
              <img className="titulo" src={f18} />
              <div className="linea">
                <div className="btn">
                  <img
                    src={f21}
                    id="mic1"
                    data-index="0"
                    onClick={this.startOrPauseRecording}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f22}
                    id="stop1"
                    data-index="0"
                    disabled={!isRecording[0]}
                    onClick={this.onComplete.bind(this, 0)}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f20}
                    id="delete1"
                    data-index="0"
                    disabled={!this.state.botongrOn[0]}
                    onClick={this.vaciarblob}
                  />
                </div>
              </div>
              <div className="linea1">
                {this.state.showRecord[0] && (
                  <ReactMic
                    record={isRecording[0]}
                    pause={isPaused[0]}
                    className="sound-wave"
                    audioBitsPerSecond={240000}
                    //audioBitsPerSecond= {60000}
                    onStop={audio => this.onStop("audio1", audio)}
                    onStart={this.onStart}
                    onSave={this.onSave}
                    strokeColor="#000000"
                    backgroundColor="#7ac5cd"
                    // mimeType="audio/mp3"
                    mimeType="audio/wav"
                  />
                )}
                <div className="segundos">
                  {/* { this.state.onParar[0] &&
                                            <Countdown
                                            date={Date.now() + 5000}
                                            autoStart={false}
                                        />
                                        } */}

                  {this.state.onInicio[0] && (
                    <Countdown
                      onComplete={() => this.onComplete(0)}
                      date={Date.now() + 5000}
                      //render={<span>{hours}:{minutes}:{seconds}</span>}
                      //render={<span>{seconds}</span>}
                    />
                  )}
                </div>
              </div>
              <div className="linea1">
                <audio
                  className="output1"
                  id="output1"
                  ref=""
                  controls="controls"
                  src={blobURL1}
                ></audio>
              </div>
              <img
                className="sig"
                src={f19}
                id="sig3"
                onClick={this.conteneaccion.bind(this, "2")}
              />
            </div>
          </div>
        )}

        {this.state.contenedorOn[3] === true && (
          <div className="contenedor4" id="p4">
            <div className="p4img1">
              <img src={f24} />
            </div>
            <div className="p4img2">
              <img src={f25} />
            </div>
            <div className="p4info">
              <img className="titulo" src={f26} />
              <div className="linea">
                <div className="btn">
                  <img
                    src={f21}
                    id="mic2"
                    data-index="1"
                    onClick={this.startOrPauseRecording}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f22}
                    id="stop2"
                    data-index="1"
                    disabled={!isRecording[1]}
                    onClick={this.onComplete.bind(this, 1)}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f20}
                    id="delete2"
                    data-index="1"
                    disabled={!this.state.botongrOn[1]}
                    onClick={this.vaciarblob}
                  />
                </div>
              </div>
              <div className="linea1">
                {this.state.showRecord[1] && (
                  <ReactMic
                    record={isRecording[1]}
                    pause={isPaused[1]}
                    className="sound-wave"
                    audioBitsPerSecond={240000}
                    //audioBitsPerSecond= {60000}
                    onStop={audio => this.onStop("audio2", audio)}
                    onStart={this.onStart}
                    onSave={this.onSave}
                    strokeColor="#000000"
                    backgroundColor="#7ac5cd"
                    mimeType="audio/mp3"
                    // mimeType="audio/wav"
                  />
                )}
                <div className="segundos">
                  {/* { this.state.onParar[0] &&
                                            <Countdown
                                            date={Date.now() + 5000}
                                            autoStart={false}
                                        />
                                        } */}

                  {this.state.onInicio[1] && (
                    <Countdown
                      onComplete={() => this.onComplete(1)}
                      date={Date.now() + 5000}
                      //render={<span>{hours}:{minutes}:{seconds}</span>}
                      //render={<span>{seconds}</span>}
                    />
                  )}
                </div>
              </div>
              <div className="linea1">
                <audio
                  className="output2"
                  id="output2"
                  ref=""
                  controls="controls"
                  src={blobURL2}
                ></audio>
              </div>
              <img
                className="sig"
                src={f27}
                id="sig4"
                onClick={this.conteneaccion.bind(this, "3")}
              />
            </div>
          </div>
        )}

        {this.state.contenedorOn[4] === true && (
          <div className="contenedor5" id="p5">
            <div className="p5img1">
              <img src={f29} />
            </div>
            <div className="p5img2">
              <img src={f30} />
            </div>
            <div className="p5info">
              <img className="titulo" src={f31} />
              <div className="linea">
                <div className="btn">
                  <img
                    src={f21}
                    id="mic3"
                    data-index="2"
                    onClick={this.startOrPauseRecording}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f22}
                    id="stop3"
                    data-index="2"
                    disabled={!isRecording[2]}
                    onClick={this.onComplete.bind(this, 2)}
                  />
                </div>
                <div className="btn">
                  <img
                    src={f20}
                    id="delete3"
                    data-index="2"
                    disabled={!this.state.botongrOn[2]}
                    onClick={this.vaciarblob}
                  />
                </div>
              </div>
              <div className="linea1">
                {this.state.showRecord[2] && (
                  <ReactMic
                    record={isRecording[2]}
                    pause={isPaused[2]}
                    className="sound-wave"
                    audioBitsPerSecond={240000}
                    onStop={audio => this.onStop("audio3", audio)}
                    onStart={this.onStart}
                    onSave={this.onSave}
                    strokeColor="#000000"
                    backgroundColor="#7ac5cd"
                    mimeType="audio/mp3"
                    // mimeType="audio/wav"
                  />
                )}
                <div className="segundos">
                  {/* { this.state.onParar[0] &&
                                            <Countdown
                                            date={Date.now() + 5000}
                                            autoStart={false}
                                        />
                                        } */}

                  {this.state.onInicio[2] && (
                    <Countdown
                      onComplete={() => this.onComplete(2)}
                      date={Date.now() + 5000}
                      //render={<span>{hours}:{minutes}:{seconds}</span>}
                      //render={<span>{seconds}</span>}
                    />
                  )}
                </div>
              </div>
              <div className="linea1">
                <audio
                  className="output3"
                  id="output3"
                  ref=""
                  controls="controls"
                  src={blobURL3}
                ></audio>
              </div>
              <img
                className="sig"
                src={f32}
                id="sig5"
                onClick={this.conteneaccion.bind(this, "4")}
              />
            </div>
          </div>
        )}

        {this.state.contenedorOn[5] === true && (
          <div className="contenedor6" id="p6">
            <div className="p6info">
              <img className="titulo" src={f34} />
              <div className="linea">
                <audio
                  className="out0"
                  id="out0"
                  ref=""
                  controls="controls"
                  src={cancion}
                ></audio>
                <audio
                  className="out1"
                  id="out1"
                  ref=""
                  controls="controls"
                  src={blobURL1}
                ></audio>
                <audio
                  className="out2"
                  id="out2"
                  ref=""
                  controls="controls"
                  src={blobURL2}
                ></audio>
                <audio
                  className="out3"
                  id="out3"
                  ref=""
                  controls="controls"
                  src={blobURL3}
                ></audio>
                {/* <button className="boton" onClick={this.crearblobfinal}>Reproducir Sonido</button>  */}
                <div className="btn">
                  <img
                    src={f36}
                    id="repro"
                    className="repro"
                    onClick={this.crearblobfinal}
                  />
                </div>
                {/* <audio className="output" id="output" controls="" src="AUDIO5.mp3"></audio> */}
              </div>
              <div className="row">
                <img
                  className="sig"
                  src={f35}
                  onClick={this.spineractivar.bind(this, "almacenar")}
                />
              </div>
            </div>
          </div>
        )}

        {/* //{this.state.contenedorOn[6] === true &&
                // <div className="col-12">

                //     {this.state.loading === true && 
                //         <div className="cont-spinner row">
                //             <div className='spinner col-6'>
                //                 <RingLoader
                //                     clasName="spinner"
                //                     sizeUnit={"px"}
                //                     size={160}
                //                     width={19}
                //                     radius={20}
                //                     height={160}
                //                     color={'#48e120'}
                //                     loading={this.state.loading}
                //                 />
                //             </div>
                //         </div>
                //     }

                    // {this.state.evolucionOn === true &&
                    //     <div className="cont-evogra row">
                    //         <div className="evogra col-12">
                    //             <span className="titulo-listevo">Listado de Grabaciones</span>
                    //             <span className="titulo-listcerrar" onClick={this.Consultar}>X</span>
                    //             <div className="cont-listevogra row">
                    //                 <div className="listevogra col-4">
                    //                     <table className="evotabla2gra">
                    //                         <tbody className="evocuerpo1">
                    //                             {this.state.ifechaevo.map((item, i)=>{
                    //                                 return<tr className={i%2 === 0 ? "odd" : ""} key={item.variable1} ><td width="130px" onClick={this.spineractivar.bind(this,"tabla",item.variable1)}  key={item.variable1} >{item.variable2}</td>
                    //                                 <td key={item.variable1}  onClick={this.spineractivar.bind(this,"tabla",item.variable1)}>{item.variable3}</td>
                    //                                 <td width="20px" ><span className='cerrarca' onClick={this.eliminar.bind(this,item.variable1)}></span></td></tr>                                    
                    //                             })}
                    //                         </tbody>
                    //                     </table>
                    //                 </div>    
                    //             </div>
                    //         </div>  
                    //     </div>   
                    // }

                    // {mensajealerta === true &&
                    //     <Alert
                    //         tituloMensaje={this.state.tituloM}
                    //         cuerpoMensaje={this.state.cuerpoM}
                    //         open={this.state.mensajealerta}
                    //         handleClose={this.handleClose}
                    //     />
                    // }
                    // <div className="titulo col-12">
                    //      <span className="stitulo">
                    //         Programa para unir pistas
                    //     </span>
                    //     <div className="cont-opcion col-3">
                    //         <label className="opcion">Indique su Email.</label>

                    //             <input
                    //                 className="form-control"
                    //                 type="text"
                    //                 name="email1"
                    //                 id="email1"
                    //                 autoComplete="off"
                    //                 value={this.state.email1}
                    //                 onChange={this.onChange}
                    //             />
                    //     </div>
                    // </div>
                    // <div className="cancionbase col-12">
                    //     <div className="subtitulo col-12">
                    //         <span className="subtitulo1">
                    //             Por favor Elija Una Cancion Base
                    //         </span>
                    //     </div>
                    //     {/* <FadeIn delay={retardo[0]} transitionDuration={transicion[0]}> 
                    //     <div className="botonescancion">
                    //         <button className={this.state.can1On?"botonOff":"boton"} onClick={this.cancionOn.bind(this,1)}>Cancion1</button>
                    //         <button className={this.state.can2On?"botonOff":"boton"} onClick={this.cancionOn.bind(this,2)}>Cancion2</button>
                    //         <button className={this.state.can3On?"botonOff":"boton"} onClick={this.cancionOn.bind(this,3)}>Cancion3</button>
                    //         <button className={this.state.can4On?"botonOff":"boton"} onClick={this.cancionOn.bind(this,4)}>Cancion4</button>
                    //         <button className={this.state.can5On?"botonOff":"boton"} onClick={this.cancionOn.bind(this,5)}>Cancion5</button>
                    //     </div>
                    //     {/* </FadeIn> 
                    //         <div className="reproducir col-12">
                    //             <audio className="output" id="output" ref="" controls="controls" src={cancion}></audio> 
                    //         </div>
                    // </div>
                    // <FadeIn delay={retardo[1]} transitionDuration={transicion[1]}>
                    // <div className="row">
                    //     <div className="cancionbase col-12">
                    //         <div className="row">
                          
                    //             <div className="grabar col-4 ">
                    //                 <div className="row">
                    //                     <div className="subtitulo col-12">
                    //                         <span className="subtitulo1">
                    //                             Grabar 1er Sonido.
                    //                         </span>
                    //                     </div>
                    //                     <div className="col-12">
                    //                        {this.state.showRecord[0] &&  <ReactMic
                    //                             record={isRecording[0]}
                    //                             pause={isPaused[0]}
                    //                             className="sound-wave" 
                    //                             audioBitsPerSecond= {240000}
                    //                             //audioBitsPerSecond= {60000}
                    //                             onStop={(audio)=>this.onStop('audio1', audio)}
                    //                             onStart={this.onStart}
                    //                             onSave={this.onSave}
                    //                             strokeColor="#000000" 
                    //                             backgroundColor="#7ac5cd"
                    //                             mimeType="audio/mp3"
                    //                             // mimeType="audio/wav"
                    //                         />}
                    //                         <div className="segundos">
                    //                             { this.state.onParar[0] &&
                    //                                 <Countdown
                    //                                 date={Date.now() + 5000}
                    //                                 autoStart={false}
                    //                             />
                    //                             }

                    //                             { this.state.onInicio[0] &&
                    //                             <Countdown
                    //                                 onComplete={() => this.onComplete(0)}
                    //                                 date={Date.now() + 5000}
                    //                                 //render={<span>{hours}:{minutes}:{seconds}</span>}
                    //                                 render={<span>{seconds}</span>}
                    //                             />
                    //                             }
                    //                         </div>

                    //                         <div className="row">
                    //                             <div className="botonesgra col-12">
                    //                                 <button id="mic1"
                    //                                 data-index='0'
                    //                                     className={this.state.isRecording[0]?"recButtonOff":"recButtonOn"}
                    //                                     disabled={this.state.botonrec[0]}
                    //                                     onClick={this.startOrPauseRecording}>  
                    //                                 </button>
                    //                                 <button id="stop1"
                    //                                 data-index='0'
                    //                                     className={this.state.isRecording[0]?"stopButtonOn":"stopButtonOff"} 
                    //                                     disabled={!isRecording[0]}
                    //                                     onClick={this.onComplete.bind(this,0)}>
                    //                                     {/* onClick={this.stopRecording}>
                                                            
                    //                                 </button>
                    //                                 <button id="delete1"  data-index='0'
                    //                                     className={this.state.botongrOn[0]?"eliButtonOn":"eliButtonOff"}
                    //                                     disabled={!this.state.botongrOn[0]}
                    //                                     onClick={this.vaciarblob}>  
                    //                                 </button>
                    //                             </div>
                    //                         </div>
                    //                         <div className="row">
                    //                             <div className="reproducir1 col-12">
                    //                                 <audio className="output1" id="output1" ref="" controls="controls" src={blobURL1}></audio> 
                    //                             </div>
                    //                         </div>    

                    //                         </div>
                    //                 </div>
                    //             </div>
                                
                    //             <div className="grabar col-4 ">
                    //                 <div className="subtitulo col-12">
                    //                     <span className="subtitulo1">
                    //                         Grabar 2do Sonido.
                    //                     </span>
                    //                 </div>
                    //                 {this.state.showRecord[1] && <ReactMic
                    //                     record={isRecording[1]}
                    //                     pause={isPaused[1]}
                    //                     className="sound-wave" 
                    //                     audioBitsPerSecond= {240000}
                    //                     //audioBitsPerSecond= {60000}
                    //                     onStop={(audio)=>this.onStop('audio2', audio)}
                    //                     onStart={this.onStart}
                    //                     onSave={this.onSave}
                    //                     strokeColor="#000000" 
                    //                     backgroundColor="#7ac5cd"
                    //                     mimeType="audio/mp3"
                    //                     // mimeType="audio/wav"
                    //                 />}
                    //                 <div className="segundos">
                    //                     { this.state.onParar[1] &&
                    //                         <Countdown
                    //                         date={Date.now() + 5000}
                    //                         autoStart={false}
                    //                     />
                    //                     }

                    //                     { this.state.onInicio[1] &&
                    //                     <Countdown
                    //                         onComplete={() => this.onComplete(1)}
                    //                         date={Date.now() + 5000}
                    //                         //render={<span>{hours}:{minutes}:{seconds}</span>}
                    //                         render={<span>{seconds}</span>}
                    //                     />
                    //                     }
                    //                 </div>

                    //                 <div className="row">
                    //                     <div className="botonesgra col-12">
                    //                         <button id="mic2"
                    //                         data-index='1'
                    //                             className={this.state.isRecording[1]?"recButtonOff":"recButtonOn"}
                    //                             disabled={this.state.botonrec[1]}
                    //                             onClick={this.startOrPauseRecording}>  
                    //                         </button>
                    //                         <button id="stop2"
                    //                         data-index='1'
                    //                             className={this.state.isRecording[1]?"stopButtonOn":"stopButtonOff"} 
                    //                             disabled={!isRecording[1]}
                    //                             onClick={this.onComplete.bind(this,1)}>
                    //                             {/* onClick={this.stopRecording}> 
                    //                         </button>
                    //                         <button
                    //                             id="delete2"
                    //                             data-index='1'
                    //                             className={this.state.botongrOn[1]?"eliButtonOn":"eliButtonOff"}
                    //                             disabled={!this.state.botongrOn[1]}
                    //                             onClick={this.vaciarblob}>  
                    //                         </button>
                    //                     </div>
                    //                 </div>
                    //                 <div className="row">
                    //                     <div className="reproducir1 col-12">
                    //                         <audio className="output2" id="output2" ref="" controls="controls" src={blobURL2}></audio> 
                    //                     </div>
                    //                 </div>    
                    //             </div>

                    //             <div className="grabar col-4 ">
                    //                 <div className="subtitulo col-12">
                    //                     <span className="subtitulo1">
                    //                         Grabar 3er Sonido.
                    //                     </span>
                    //                 </div>
                    //                {this.state.showRecord[2] && <ReactMic
                    //                     record={isRecording[2]}
                    //                     pause={isPaused[2]}
                    //                     className="sound-wave" 
                    //                     audioBitsPerSecond= {240000}
                    //                     onStop={(audio)=>this.onStop('audio3', audio)}
                    //                     onStart={this.onStart}
                    //                     onSave={this.onSave}
                    //                     strokeColor="#000000" 
                    //                     backgroundColor="#7ac5cd"
                    //                     mimeType="audio/mp3"
                    //                     // mimeType="audio/wav"
                    //                 />}
                    //                 <div className="segundos">
                    //                     { this.state.onParar[2] &&
                    //                         <Countdown
                    //                         date={Date.now() + 5000}
                    //                         autoStart={false}
                    //                     />
                    //                     }

                    //                     { this.state.onInicio[2] &&
                    //                     <Countdown
                    //                         onComplete={() => this.onComplete(2)}
                    //                         date={Date.now() + 5000}
                    //                         //render={<span>{hours}:{minutes}:{seconds}</span>}
                    //                         render={<span>{seconds}</span>}
                    //                     />
                    //                     }
                    //                 </div>

                    //                 <div className="row">
                    //                     <div className="botonesgra col-12">
                    //                         <button id="mic3"
                    //                         data-index='2'
                    //                             className={this.state.isRecording[2]?"recButtonOff":"recButtonOn"}
                    //                             disabled={this.state.botonrec[2]}
                    //                             onClick={this.startOrPauseRecording}>  
                    //                         </button>
                    //                         <button id="stop3"
                    //                         data-index='2'
                    //                             className={this.state.isRecording[2]?"stopButtonOn":"stopButtonOff"} 
                    //                             disabled={!isRecording[2]}
                    //                             onClick={this.onComplete.bind(this,2)}>
                    //                             {/* onClick={this.stopRecording}> 
                    //                         </button>
                    //                         <button id="delete3"
                    //                         data-index='2'
                    //                             className={this.state.botongrOn[2]?"eliButtonOn":"eliButtonOff"}
                    //                             disabled={!this.state.botongrOn[2]}
                    //                             onClick={this.vaciarblob}>  
                    //                         </button>
                    //                     </div>
                    //                 </div>
                    //                 <div className="row">
                    //                     <div className="reproducir1 col-12">
                    //                         <audio className="output3" id="output3" ref="" controls="controls" src={blobURL3}></audio> 
                    //                     </div>
                    //                 </div>    
                    //             </div>
                                
                    //         </div>
                    //     </div>
                    // </div>
                    // </FadeIn>
                    // <FadeIn delay={retardo[2]} transitionDuration={transicion[2]}>
                    // <div className="row">
                    //     <div className="cancionbase col-12">
                    //         <div className="subtitulo col-12">
                    //             <span className="subtitulo1">
                    //                 Haga click en el boton Reproducir para escuchar el sonido
                    //             </span>
                    //         </div>
                    //         <div className="botonescancion">
                    //             <button className="boton" onClick={this.crearblobfinal}>Reproducir Sonido</button> 
                    //         </div>
                    //         <div className="row">
                    //             <div className="reproducir1 col-12">
                    //                 <audio className="output4" id="output4" ref="" controls="controls" ></audio> 
                    //             </div>
                    //         </div>    

                    //         <div className="botonescancion">
                    //             <button className="boton" onClick={this.spineractivar.bind(this,"almacenar")}>Guardar Sonido</button>
                    //             <button className="boton" onClick={this.spineractivar.bind(this,"consul")}>Consultar Sonidos</button>
                    //             <button className="boton" onClick={this.limpiar}>Limpiar</button>
                    //     </div>
                    //     </div>
                    // </div>
                    // </FadeIn>
                // </div>
      }*/}
      </div>
    );
  }
}
export default CancionAction;
