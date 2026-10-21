(module
  (memory (export "memory") 64 128)
  (func (export "at") (param $p i32) (result i32) (i32.load (local.get $p)))
  (func (export "sum") (param $p i32) (param $n i32) (result i32)
    (local $i i32) (local $total i32)
    (block $done (loop $again
      (br_if $done (i32.ge_u (local.get $i) (local.get $n)))
      (local.set $total (i32.add (local.get $total)
        (i32.load (i32.add (local.get $p) (i32.mul (local.get $i) (i32.const 4))))))
      (local.set $i (i32.add (local.get $i) (i32.const 1))) (br $again)))
    (local.get $total))
  (func (export "transform") (param $p i32) (param $n i32)
    (local $i i32) (local $address i32)
    (block $done (loop $again
      (br_if $done (i32.ge_u (local.get $i) (local.get $n)))
      (local.set $address (i32.add (local.get $p) (i32.mul (local.get $i) (i32.const 4))))
      (i32.store (local.get $address) (i32.add
        (i32.mul (i32.load (local.get $address)) (i32.const 2)) (i32.const 1)))
      (local.set $i (i32.add (local.get $i) (i32.const 1))) (br $again)))))
