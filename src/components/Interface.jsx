import watermark from "../assets/logo-white.png";

export const Interface = () => {
  return (
    <>
      <div className="interface">
        <h1 className="interface__title">
          ⭐️ for Christmas Ambiance / 👇 for Christmas Party
        </h1>
        <a
          className="interface__link"
          href="https://youtube.com/@wawasensei"
          target="_blank"
        >
          youtube.com/@wawasensei
        </a>
      </div>
      <a href="https://youtube.com/@wawasensei" target="_blank">
        <img className="watermark" src={watermark} />
      </a>
    </>
  );
};
