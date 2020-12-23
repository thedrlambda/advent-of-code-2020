import java.util.HashMap;

public class day15 {
  static int generator(long turns) {
    HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
    int[] starters = new int[]{16, 11, 15, 0, 1, 7};
    int prev = starters[0];
    for (int turn = 0; turn < turns; turn++) {
      int num;
      if (turn < starters.length) {
        num = starters[turn];
      } else {
        num = map.containsKey(prev) ? turn - map.get(prev) : 0;
      }
      map.put(prev, turn);
      prev = num;
    }
    return prev;
  }
  static int ex1() {
    return generator(2020);
  }
  static int ex2() {
    return generator(30000000);
  }

  public static void main(String[] args) {
    System.out.println("Advent 15.2: " + ex2());
  }

}