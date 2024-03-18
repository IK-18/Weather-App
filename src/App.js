import {BrowserRouter, Routes, Route} from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./styles/output.css";
import LandingPage from "./pages/LandingPage";
import Weather from "./pages/Weather";
import Helmet from "react-helmet";
import favicon from "./assets/images/4052984.png";

function App() {
	return (
		<BrowserRouter basename='/'>
			<Helmet>
				<meta charset='UTF-8' />
				<meta http-equiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<title>Weather4U</title>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
				<link rel='fa' href='./images/4052984.png' type='image/png' />
			</Helmet>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/weather' element={<Weather />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
