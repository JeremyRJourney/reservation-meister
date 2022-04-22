
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

const Main = () => {
    return (
        <div>
            <div style={{ display: 'flex', height: "100vh" }}>
                <Navbar />
                <div style={{ borderLeft: '2px solid #000', width: '100%' }}>
                    <Header />
                    <h1 style={{ padding: '24px' }}>Main</h1>
                </div>
            </div>

        </div>
    )
}

export default Main
