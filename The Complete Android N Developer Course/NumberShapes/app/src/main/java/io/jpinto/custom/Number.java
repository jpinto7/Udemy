package io.jpinto.custom;

/**
 * Created by Juan Pablo on 14/10/2016.
 */

public class Number {

    private double mNumber;

    public Number(double number) {
        mNumber = number;
    }

    public boolean isPositiveInteger() {
        if (mNumber > 0) {
            double sqrResult = Math.sqrt(mNumber);
            return (sqrResult % 1) == 0;
        } else {
            return false;
        }
    }

    public boolean isTriangularNumber() {
        return false;
    }
}
