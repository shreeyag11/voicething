package sd;

public class Adder<T extends Number> {
    T lhs, rhs;

    private final BinaryOperator<T> adder;

    public Adder(T lhs, T rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    public T add() {
        return adder.apply(lhs, rhs);
    }
}