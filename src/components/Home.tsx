import { FC } from "react";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Home: FC = () => {
    return (
        <div style={{
           display: "flex",
           alignItems: "center",
           flexDirection: "column",
           justifyContent: "center",
           top: "40%",
            position: "relative",
        }}>
            <div
                style={{
                    fontSize: 100,
                    height: "100%",
                    width: "100%",
                    textAlign: "center",
                }}>
                Capture the Fruits
            </div>
            <div
                style={{
                textAlign: "center",
            }}>
                <button>
                    Play now
                </button>
                <button>
                    Tutorial
                </button>
            </div>
        </div>

    );
};
export default Home;
