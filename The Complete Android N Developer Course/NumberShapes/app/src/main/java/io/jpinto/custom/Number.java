package io.jpinto.custom;

/**
 * Created by Juan Pablo on 14/10/2016.
 */

public class Number {

    private double mNumber;

    public Number(double number) {
        mNumber = number < 0 ? 0 : number;
    }

    private boolean isSquare(double number) {
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
            double result = 8*mNumber + 1;
            return isSquare(result);
        } else {
            return false;
        }
    }

    public boolean isSquareAndTriangular() {
        return (isTriangular() && isSquare());
    }
}
