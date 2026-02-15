import { useEffect, useMemo, useState } from "react";
import JSConfetti from "js-confetti";

// Puedes cambiar estos GIFs cuando quieras
const DEFAULT_GIF =
  "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif";

const SUCCESS_GIF =
  "https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif";

// Lista de respuestas (IDs únicos)
const RANDOM_OPTIONS = [
  { id: 1, description: "Di si por favor", img: "https://media1.tenor.com/m/bBXIhFAxGuAAAAAd/cat-love.gif" },
  { id: 2, description: "Piénsalo de nuevo.", img: "https://media.tenor.com/H1VphHpwZj4AAAAi/amor-receba.gif" },
  { id: 3, description: "Vamos, atrévete a decir que sí.", img: "https://media.tenor.com/6JcX0e5DoK8AAAAj/knooye.gif" },
  { id: 4, description: "No tengas miedo, será genial.", img: "https://media1.tenor.com/m/K6jxZ2fYy2EAAAAC/crystal-amaru.gif" },
  { id: 5, description: "Confía en mí, será divertido.", img: "https://media.tenor.com/Bn88VELdNI8AAAAi/peach-goma.gif" },
  { id: 6, description: "No tengas dudas, te hará sonreír.", img: "https://media.tenor.com/WlJsOVX2lysAAAAi/cat-tongue-cat.gif" },
  { id: 7, description: "Te prometo que será inolvidable.", img: "https://media1.tenor.com/m/61rxJf_FVmQAAAAC/amor-memes-de-amor.gif" },
  { id: 8, description: "No dejes que el miedo te detengaaaaa.", img: "https://media1.tenor.com/m/ADrJ77Dxf_MAAAAC/quby-qubh-bhuwan-qub.gif" },
  { id: 9, description: "Confía en el destino, nos está dando una señal.", img: "https://media.tenor.com/GJUz8DogSTUAAAAi/cute-cat-cutie.gif" },
  { id: 10, description: "Confía en mí.", img: "https://media.tenor.com/Bav2QWeveKgAAAAi/best-banana-cat.gif" },
  { id: 11, description: "No te arrepentirás.", img: "https://media1.tenor.com/m/2gJuUbTvZqMAAAAC/wut-socked.gif" },
];

export default function App() {
  const jsConfetti = useMemo(() => new JSConfetti(), []);

  const [randomValor, setRandomValor] = useState(null);
  const [imagenCargada, setImagenCargada] = useState(false);
  const [agrandar, setAgrandar] = useState(52); // un poco más alto para móvil
  const [valueSi, setValueSi] = useState(false);

  const currentGif = randomValor?.img ?? DEFAULT_GIF;
  const currentText = randomValor?.description ?? "No";

  // cada vez que cambia el gif => "cargando"
  useEffect(() => {
    setImagenCargada(false);
  }, [currentGif]);

  // title dinámico
  useEffect(() => {
    if (valueSi) {
      document.title = "Sabía que dirías que sí ❤️!";
    } else {
      document.title = randomValor?.description ?? "¿Quieres ser mi San Valentin?";
    }
  }, [valueSi, randomValor]);

  const handleImageLoad = () => setImagenCargada(true);
  const handleImageError = () => setImagenCargada(true);

  const randomResponse = () => {
    let nextIndex = Math.floor(Math.random() * RANDOM_OPTIONS.length);

    // evita repetir el mismo gif para que no se trabe
    if (RANDOM_OPTIONS.length > 1) {
      while (RANDOM_OPTIONS[nextIndex].img === currentGif) {
        nextIndex = Math.floor(Math.random() * RANDOM_OPTIONS.length);
      }
    }

    setAgrandar((a) => (a <= 520 ? a + 10 : a)); // limite razonable
    setRandomValor(RANDOM_OPTIONS[nextIndex]);
  };

  return (
    <main
      id="canvas"
      className="
        fondo
        min-h-dvh w-full
        flex items-center justify-center
        px-4 py-8
        bg-no-repeat bg-cover bg-center
      "
      style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
    >
      {!valueSi ? (
        <div
          className="
            w-full max-w-sm
            text-center
            bg-white/10 backdrop-blur
            rounded-2xl
            p-5
            shadow-lg
          "
        >
          <h1 className="text-white font-extrabold leading-tight text-4xl">
            ¿Quieres ser mi <br /> San Valentín?
          </h1>

          <div className="mt-5 flex justify-center">
            <img
              key={currentGif}
              src={currentGif}
              alt="San Valentin"
              className="w-72 max-w-full h-auto select-none"
              onLoad={handleImageLoad}
              onError={handleImageError}
              draggable={false}
            />
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={() => {
                setValueSi(true);
                jsConfetti.addConfetti({
                  emojis: ["😍", "🥰", "❤️", "😘"],
                  emojiSize: 70,
                  confettiNumber: 80,
                });
              }}
              className="
                w-full
                bg-green-500 active:bg-green-600
                text-white font-bold
                rounded-xl
                text-xl
                shadow-md
              "
              style={{ height: agrandar }}
            >
              Sí
            </button>

            <button
              onClick={randomResponse}
              disabled={!imagenCargada}
              className="
                w-full
                bg-red-500 active:bg-red-600
                text-white font-bold
                rounded-xl
                py-4 text-xl
                shadow-md
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {currentText}
            </button>
          </div>

          <p className="mt-5 text-white/80 text-sm">
            (Te lo estoy preguntando con cariño 😼)
          </p>
        </div>
      ) : (
        <div
          className="
            w-full max-w-sm
            text-center
            bg-white/10 backdrop-blur
            rounded-2xl
            p-5
            shadow-lg
          "
        >
          <h1 className="text-white font-extrabold leading-tight text-3xl">
            Sabía que dirías que sí!
Feliz San Valentín ❤️!
          </h1>

          <div className="mt-5 flex justify-center">
            <img
              src={SUCCESS_GIF}
              alt="Felicidad"
              className="w-72 max-w-full h-auto select-none"
              draggable={false}
            />
          </div>
        </div>
      )}
    </main>
  );
}
