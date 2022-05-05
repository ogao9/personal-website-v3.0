import { useState, useEffect, useRef} from "react"

export default function useScrollDirection() {
	const prevScrollY = useRef(0); // useRef is like useState except it doesn't trigger a re-render of the page
	const [goingUp, setGoingUp] = useState(false);
  
	const handleScroll = () => {
		const currentScrollY = window.scrollY;

		// only set state if we need to change it
		if (prevScrollY.current < currentScrollY && goingUp) {
			setGoingUp(false);
		}
		else if (prevScrollY.current > currentScrollY && !goingUp) {
			setGoingUp(true);
		}

		prevScrollY.current = currentScrollY;
	};
  
	// we create a new handleScroll() everytime so that we have the most up to date value of goingUp
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll); // cleanup
	}, [goingUp]); 


	return goingUp;
}