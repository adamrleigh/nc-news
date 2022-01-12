import { useState } from "react";



export const useCount = (startNum) => {

    const [count, setCount] = useState(startNum);

    const increaseCount = () => {
        setCount(function (currCount) {
            return currCount + 1;
        })
    }

    const decreaseCount = () => {
        setCount(function (currCount) {
            return currCount - 1;
        })
    }

    return { count, setCount, increaseCount, decreaseCount}
}
