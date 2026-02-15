import { useEffect, useMemo, useState } from "react";
import JSConfetti from "js-confetti";

// Puedes cambiar estos GIFs cuando quieras
const DEFAULT_GIF =
  "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif";

const SUCCESS_GIF =
  "https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif";

// Lista de respuestas (IDs únicos)
const RANDOM_OPTIONS = [
  {
    id: 1,
    description: "Di si por favor",
    img: "https://media1.tenor.com/m/bBXIhFAxGuAAAAAd/cat-love.gif",
  },
  {
    id: 2,
    description: "Piénsalo de nuevo.",
    img: "https://media.tenor.com/H1VphHpwZj4AAAAi/amor-receba.gif",
  },
  {
    id: 3,
    description: "Vamos, atrévete a decir que sí.",
    img: "https://media.tenor.com/6JcX0e5DoK8AAAAj/knooye.gif",
  },
  {
    id: 4,
    description: "No tengas miedo, será genial.",
    img: "https://media1.tenor.com/m/K6jxZ2fYy2EAAAAC/crystal-amaru.gif",
  },
  {
    id: 5,
    description: "Confía en mí, será divertido.",
    img: "https://media.tenor.com/Bn88VELdNI8AAAAi/peach-goma.gif",
  },
  {
    id: 6,
    description: "No tengas dudas, te hará sonreír.",
    img: "https://media.tenor.com/WlJsOVX2lysAAAAi/cat-tongue-cat.gif",
  },
  {
    id: 7,
    description: "Te prometo que será inolvidable.",
    img: "https://media1.tenor.com/m/61rxJf_FVmQAAAAC/amor-memes-de-amor.gif",
  },
  {
    id: 8,
    description: "No dejes que el miedo te detengaaaaa.",
    img: "https://media1.tenor.com/m/ADrJ77Dxf_MAAAAC/quby-qubh-bhuwan-qub.gif",
  },
  {
    id: 9,
    description: "Confía en el destino, nos está dando una señal.",
    img: "https://media.tenor.com/GJUz8DogSTUAAAAi/cute-cat-cutie.gif",
  },
  {
    id: 10,
    description: "Confía en mí.",
    img: "https://media.tenor.com/Bav2QWeveKgAAAAi/best-banana-cat.gif",
  },
  {
    id: 11,
    description: "No te arrepentirás.",
    img: "https://media1.tenor.com/m/2gJuUbTvZqMAAAAC/wut-socked.gif",
  },
];

function App() {
  // JSConfetti solo se crea 1 vez
  const jsConfetti = useMemo(() => new JSConfetti(), []);

  const [randomValor, setRandomValor] = useState(null);
  const [imagenCargada, setImagenCargada] = useState(false);
  const [agrandar, setAgrandar] = useState(45);
  const [valueSi, setValueSi] = useState(false);

  const currentGif = randomValor?.img ?? DEFAULT_GIF;
  const currentText = randomValor?.description ?? "No";

  // ✅ Cada vez que cambia el GIF, lo marcamos como "cargando"
  useEffect(() => {
    setImagenCargada(false);
  }, [currentGif]);

  // ✅ Título del navegador bien manejado
  useEffect(() => {
    if (valueSi) {
      document.title = "Sabía que dirías que sí ❤️!";
    } else {
      document.title = randomValor?.description ?? "¿Quieres ser mi San Valentin?";
    }
  }, [valueSi, randomValor]);

  // Cuando carga la imagen habilitamos el botón "No"
  const handleImageLoad = () => setImagenCargada(true);

  // Si el GIF falla (link roto), habilita igual para que no se trabe
  const handleImageError = () => setImagenCargada(true);

  const randomResponse = () => {
    // ✅ Escoge un GIF diferente al actual para que NUNCA se quede trabado
    let nextIndex = Math.floor(Math.random() * RANDOM_OPTIONS.length);

    if (RANDOM_OPTIONS.length > 1) {
      while (RANDOM_OPTIONS[nextIndex].img === currentGif) {
        nextIndex = Math.floor(Math.random() * RANDOM_OPTIONS.length);
      }
    }

    setAgrandar((a) => (a <= 500 ? a + 10 : a));
    setRandomValor(RANDOM_OPTIONS[nextIndex]);
  };

  return (
    <main
      id="canvas"
      className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center"
    >
      {!valueSi ? (
        <div className="p-5">
          <h1 className="text-white font-bold text-5xl text-center">
            ¿Quieres ser mi San Valentin?
          </h1>

          <img
            key={currentGif} // ✅ fuerza remount cuando cambia (extra seguridad)
            src={currentGif}
            alt="San Valentin"
            className="mx-auto"
            width={400}
            height={400}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
            <button
              onClick={() => {
                setValueSi(true);

                jsConfetti.addConfetti({
                  emojis: ["😍", "🥰", "❤️", "😘"],
                  emojiSize: 70,
                  confettiNumber: 80,
                });
              }}
              className="bg-green-500 text-white font-bold p-2 rounded-md text-xl"
              style={{ height: agrandar }}
            >
              Si
            </button>

            <button
              className="bg-red-500 text-white font-bold p-2 rounded-md text-xl disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={randomResponse}
              disabled={!imagenCargada} // ✅ bloquea solo mientras carga
            >
              {currentText}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-10">
          <h1 className="text-4xl text-white font-bold">
            Sabía que dirías que sí uu❤️!
          </h1>
          <img src={SUCCESS_GIF} alt="Felicidad" className="mx-auto" />
        </div>
      )}
    </main>
  );
}

export default App;
