package sd;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class AppTest extends TestCase {
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest(String testName) {
        super(testName);
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite() {
        return new TestSuite(AppTest.class);
    }

    /**
     * Rigourous Test :-)
     */
    public void testAdder() {
        double[][] x = { { 1, 2, 3 }, { 4, 5, 6 } };
        double[][] y = { { 7, 8 }, { 9, 10 }, { 11, 12 } };
        double[][] z = { { 58, 64 }, { 139, 154 } };
        Matrix a = new Matrix(x);
        Matrix b = new Matrix(y);
        assertTrue(a.matMul(b).data == z);
    }
}
