import { FC } from "react";
import {Link} from "react-router-dom";

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
                <Link to="/play">
                    <button>
                        Play now
                    </button>
                </Link>
                <Link to="/play">
                    <button>
                        Tutorial
                    </button>
                </Link>
            </div>
        </div>

    );
};
export default Home;
