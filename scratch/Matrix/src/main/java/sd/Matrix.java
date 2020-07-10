package sd;

public class Matrix {
    // int row, column;
    double[][] data;

    public Matrix(double[][] data) {
        // this.row = row;
        // this.column = column;
        this.data = data;
    }

    public void matMul(Matrix other) {
        int row1 = this.data.length;
        int col1 = this.data[0].length;
        int row2 = other.data.length;
        int col2 = other.data[0].length;

        if (col1 != row2)
            return;

        int res[][] = new int[row1][col2];

        for (int i = 0; i < row1; i++) {
            for (int j = 0; j < col2; j++) {
                res[i][j] = 0;
                for (int k = 0; k < col1; k++) {
                    res[i][j] += this.data[i][k] * other.data[k][j];
                }
            }
        }
        // return res;
    }
}