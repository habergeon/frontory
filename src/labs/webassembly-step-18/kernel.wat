(module
 (import "host" "report" (func $report (param i32)))
 (memory (export "memory") 2 8)
 (func (export "add") (param i32 i32) (result i32) local.get 0 local.get 1 i32.add)
 (func (export "report") (param i32) local.get 0 call $report)
 (func (export "read") (param i32) (result i32) local.get 0 i32.load)
 (func (export "sum") (param $p i32) (param $n i32) (result i32)
  (local $i i32) (local $s i32)
  (block $done (loop $loop
   local.get $i local.get $n i32.ge_u br_if $done
   local.get $s local.get $p local.get $i i32.const 4 i32.mul i32.add i32.load i32.add local.set $s
   local.get $i i32.const 1 i32.add local.set $i br $loop)) local.get $s)
 (func (export "transform") (param $p i32) (param $n i32)
  (local $i i32) (local $a i32)
  (block $done (loop $loop
   local.get $i local.get $n i32.ge_u br_if $done
   local.get $p local.get $i i32.const 4 i32.mul i32.add local.set $a
   local.get $a local.get $a i32.load i32.const 2 i32.mul i32.const 1 i32.add i32.store
   local.get $i i32.const 1 i32.add local.set $i br $loop))))
