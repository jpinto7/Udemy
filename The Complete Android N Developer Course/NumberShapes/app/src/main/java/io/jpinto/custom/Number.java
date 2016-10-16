package io.jpinto.custom;

/**
 * Author: Juan Pablo
 * Date: 14/10/2016
 */

public class Number {

    private int mNumber;

    public Number(int number) {
        mNumber = number < 0 ? 0 : number;
    }

    private boolean isSquare(int number) {
        if (number > 0) {
            double sqrResult = Math.sqrt(number);
            return (sqrResult % 1) == 0;
        } else {
            return false;
        }
    }

    public boolean isSquare() {
        return isSquare(mNumber);
    }

    public boolean isTriangular() {
        if (mNumber > 0) {
            int result = 8*mNumber + 1;
            return isSquare(result);
        } else {
            return false;
        }
    }

    public boolean isSquareAndTriangular() {
        return (isTriangular() && isSquare());
    }
}
