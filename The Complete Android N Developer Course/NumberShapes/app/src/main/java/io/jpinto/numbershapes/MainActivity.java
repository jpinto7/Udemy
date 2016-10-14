package io.jpinto.numbershapes;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.ViewDebug;
import android.widget.EditText;
import android.widget.Toast;

import io.jpinto.custom.Number;

public class MainActivity extends AppCompatActivity {

    Number mNumber;
    EditText mUsersNumber;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mUsersNumber = (EditText) findViewById(R.id.usersNumber);
    }

    public void testNumber(View view) {
        double number;
        try {
            number = Double.parseDouble(mUsersNumber.getText().toString());
            mNumber = new Number(number);

            if (mNumber.isSquareAndTriangular()) {
                Toast.makeText(getApplicationContext(), "Your number is a square and triangular number!", Toast.LENGTH_LONG).show();
            } else if (mNumber.isSquare()) {
                Toast.makeText(getApplicationContext(), "Your number is a square number!", Toast.LENGTH_LONG).show();
            } else if (mNumber.isTriangular()) {
                Toast.makeText(getApplicationContext(), "Your number is a triangular number!", Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(getApplicationContext(), "Your number is neither a square nor triangular number!", Toast.LENGTH_LONG).show();
            }
        } catch(NumberFormatException e) {
            Toast.makeText(getApplicationContext(), "Parse value is not valid!", Toast.LENGTH_LONG).show();
        }
    }
}
