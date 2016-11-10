package io.jpinto.connect3.model;

/**
 * Created by Juan Pablo on 09/11/2016.
 */

public enum Player {
    One {
        @Override
        public String toString() {
            return "Player 1";
        }
    },
    Two {
        @Override
        public String toString() {
            return "Player 2";
        }
    }, None {
        @Override
        public String toString() {
            return "None";
        }
    }
}
