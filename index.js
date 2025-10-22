var $Module$$;
$Module$$ ||= typeof Module != 'undefined' ? Module : {};
var $ENVIRONMENT_IS_WEB$$ = "object" == typeof window, $ENVIRONMENT_IS_WORKER$$ = "undefined" != typeof WorkerGlobalScope, $ENVIRONMENT_IS_NODE$$ = "object" == typeof process && process.versions?.node && "renderer" != process.type, $ENVIRONMENT_IS_SHELL$$ = !$ENVIRONMENT_IS_WEB$$ && !$ENVIRONMENT_IS_NODE$$ && !$ENVIRONMENT_IS_WORKER$$;
let $$jscomp$logical$assign$tmp745725642$0$$;
($$jscomp$logical$assign$tmp745725642$0$$ = $Module$$).expectedDataFileDownloads ?? ($$jscomp$logical$assign$tmp745725642$0$$.expectedDataFileDownloads = 0);
$Module$$.expectedDataFileDownloads++;
(() => {
  var $isWasmWorker$$ = "undefined" != typeof ENVIRONMENT_IS_WASM_WORKER && ENVIRONMENT_IS_WASM_WORKER;
  if (!("undefined" != typeof ENVIRONMENT_IS_PTHREAD && ENVIRONMENT_IS_PTHREAD || $isWasmWorker$$)) {
    var $isNode$$ = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
    (async function($metadata$$) {
      async function $fetchRemotePackage$$($packageData_packageName$$, $packageSize_total$$) {
        if ($isNode$$) {
          return (await require("fs/promises").readFile($packageData_packageName$$)).buffer;
        }
        var $$jscomp$logical$assign$tmp745725642$1_chunks$$;
        ($$jscomp$logical$assign$tmp745725642$1_chunks$$ = $Module$$).dataFileDownloads ?? ($$jscomp$logical$assign$tmp745725642$1_chunks$$.dataFileDownloads = {});
        try {
          var $reader_response$jscomp$2$$ = await fetch($packageData_packageName$$);
        } catch ($e$jscomp$7$$) {
          throw Error(`Network Error: ${$packageData_packageName$$}`, {e:$e$jscomp$7$$});
        }
        if (!$reader_response$jscomp$2$$.ok) {
          throw Error(`${$reader_response$jscomp$2$$.status}: ${$reader_response$jscomp$2$$.url}`);
        }
        $$jscomp$logical$assign$tmp745725642$1_chunks$$ = [];
        $packageSize_total$$ = Number($reader_response$jscomp$2$$.headers.get("Content-Length") ?? $packageSize_total$$);
        let $loaded$$ = 0;
        $Module$$.setStatus?.("Downloading data...");
        for ($reader_response$jscomp$2$$ = $reader_response$jscomp$2$$.body.getReader();;) {
          var {done:$done$$, value:$value$jscomp$110$$} = await $reader_response$jscomp$2$$.read();
          if ($done$$) {
            break;
          }
          $$jscomp$logical$assign$tmp745725642$1_chunks$$.push($value$jscomp$110$$);
          $loaded$$ += $value$jscomp$110$$.length;
          $Module$$.dataFileDownloads[$packageData_packageName$$] = {loaded:$loaded$$, total:$packageSize_total$$};
          let $totalLoaded$$ = 0, $totalSize$$ = 0;
          for (var $download_offset$jscomp$67$$ of Object.values($Module$$.dataFileDownloads)) {
            $totalLoaded$$ += $download_offset$jscomp$67$$.loaded, $totalSize$$ += $download_offset$jscomp$67$$.total;
          }
          $Module$$.setStatus?.(`Downloading data... (${$totalLoaded$$}/${$totalSize$$})`);
        }
        $packageData_packageName$$ = new Uint8Array($$jscomp$logical$assign$tmp745725642$1_chunks$$.map($c$$ => $c$$.length).reduce(($a$jscomp$1$$, $b$jscomp$1$$) => $a$jscomp$1$$ + $b$jscomp$1$$, 0));
        $download_offset$jscomp$67$$ = 0;
        for (const $chunk$jscomp$14$$ of $$jscomp$logical$assign$tmp745725642$1_chunks$$) {
          $packageData_packageName$$.set($chunk$jscomp$14$$, $download_offset$jscomp$67$$), $download_offset$jscomp$67$$ += $chunk$jscomp$14$$.length;
        }
        return $packageData_packageName$$.buffer;
      }
      async function $runWithFS$$($Module$jscomp$1$$) {
        $Module$jscomp$1$$.FS_createPath("/", "assets", !0, !0);
        for (var $file$jscomp$1$$ of $metadata$$.files) {
          $Module$jscomp$1$$.addRunDependency(`fp ${$file$jscomp$1$$.filename}`);
        }
        $Module$jscomp$1$$.addRunDependency("datafile_index.data");
        $Module$jscomp$1$$.preloadResults ?? ($Module$jscomp$1$$.preloadResults = {});
        $Module$jscomp$1$$.preloadResults["index.data"] = {$fromCache$:!1};
        $fetched$$ ||= await $fetchPromise$$;
        (async function($arrayBuffer_byteArray$$) {
          if (!$arrayBuffer_byteArray$$) {
            throw Error("Loading data file failed.");
          }
          if ($arrayBuffer_byteArray$$.constructor.name !== ArrayBuffer.name) {
            throw Error("bad input to processPackageData");
          }
          $arrayBuffer_byteArray$$ = new Uint8Array($arrayBuffer_byteArray$$);
          for (var $file$jscomp$2$$ of $metadata$$.files) {
            var $name$jscomp$81$$ = $file$jscomp$2$$.filename, $data$jscomp$91$$ = $arrayBuffer_byteArray$$.subarray($file$jscomp$2$$.start, $file$jscomp$2$$.end);
            $Module$jscomp$1$$.FS_createDataFile($name$jscomp$81$$, null, $data$jscomp$91$$, !0, !0, !0);
            $Module$jscomp$1$$.removeRunDependency(`fp ${$name$jscomp$81$$}`);
          }
          $Module$jscomp$1$$.removeRunDependency("datafile_index.data");
        })($fetched$$);
      }
      "object" === typeof window ? window.encodeURIComponent(window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/") : "undefined" === typeof process && "undefined" !== typeof location && encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/");
      var $REMOTE_PACKAGE_NAME$$ = $Module$$.locateFile?.("index.data", "") ?? "index.data", $REMOTE_PACKAGE_SIZE$$ = $metadata$$.remote_package_size, $fetchPromise$$, $fetched$$ = $Module$$.getPreloadedPackage?.($REMOTE_PACKAGE_NAME$$, $REMOTE_PACKAGE_SIZE$$);
      $fetched$$ || ($fetchPromise$$ = $fetchRemotePackage$$($REMOTE_PACKAGE_NAME$$, $REMOTE_PACKAGE_SIZE$$));
      if ($Module$$.calledRun) {
        $runWithFS$$($Module$$);
      } else {
        let $$jscomp$logical$assign$tmp745725642$3$$;
        (($$jscomp$logical$assign$tmp745725642$3$$ = $Module$$).preRun ?? ($$jscomp$logical$assign$tmp745725642$3$$.preRun = [])).push($runWithFS$$);
      }
    })({files:[{filename:"/assets/close.png", start:0, end:31303}, {filename:"/assets/collapse.png", start:31303, end:51757}, {filename:"/assets/expand.png", start:51757, end:72690}, {filename:"/assets/file.png", start:72690, end:87689}, {filename:"/assets/jetbrains-mono.ttf", start:87689, end:274897}, {filename:"/assets/logo.png", start:274897, end:276989}], remote_package_size:276989});
  }
})();
if ("undefined" != typeof ENVIRONMENT_IS_WASM_WORKER && ENVIRONMENT_IS_WASM_WORKER || "undefined" != typeof ENVIRONMENT_IS_PTHREAD && ENVIRONMENT_IS_PTHREAD || "undefined" != typeof ENVIRONMENT_IS_AUDIO_WORKLET && ENVIRONMENT_IS_AUDIO_WORKLET) {
  $Module$$.preRun = [];
}
var $necessaryPreJSTasks$$ = $Module$$.preRun.slice();
if (!$Module$$.preRun) {
  throw "Module.preRun should exist because file support used it; did a pre-js delete it?";
}
$necessaryPreJSTasks$$.forEach($task$$ => {
  if (0 > $Module$$.preRun.indexOf($task$$)) {
    throw "All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?";
  }
});
var $arguments_$$ = [], $thisProgram$$ = "./this.program", $quit_$$ = ($status$$, $toThrow$$) => {
  throw $toThrow$$;
}, $_scriptName$$ = "undefined" != typeof document ? document.currentScript?.src : void 0;
"undefined" != typeof __filename ? $_scriptName$$ = __filename : $ENVIRONMENT_IS_WORKER$$ && ($_scriptName$$ = self.location.href);
var $scriptDirectory$$ = "", $readAsync$$, $readBinary$$;
if ($ENVIRONMENT_IS_NODE$$) {
  if ("object" != typeof process || !process.versions?.node || "renderer" == process.type) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var $nodeVersion$$ = process.versions.node, $numericVersion$$ = $nodeVersion$$.split(".").slice(0, 3);
  $numericVersion$$ = 10000 * $numericVersion$$[0] + 100 * $numericVersion$$[1] + 1 * $numericVersion$$[2].split("-")[0];
  if (160000 > $numericVersion$$) {
    throw Error("This emscripten-generated code requires node v16.0.0 (detected v" + $nodeVersion$$ + ")");
  }
  var fs = require("fs");
  $scriptDirectory$$ = __dirname + "/";
  $readBinary$$ = $filename$jscomp$15_ret$$ => {
    $filename$jscomp$15_ret$$ = $isFileURI$$($filename$jscomp$15_ret$$) ? new URL($filename$jscomp$15_ret$$) : $filename$jscomp$15_ret$$;
    $filename$jscomp$15_ret$$ = fs.readFileSync($filename$jscomp$15_ret$$);
    $assert$$(Buffer.isBuffer($filename$jscomp$15_ret$$));
    return $filename$jscomp$15_ret$$;
  };
  $readAsync$$ = async $filename$jscomp$16_ret$jscomp$1$$ => {
    $filename$jscomp$16_ret$jscomp$1$$ = $isFileURI$$($filename$jscomp$16_ret$jscomp$1$$) ? new URL($filename$jscomp$16_ret$jscomp$1$$) : $filename$jscomp$16_ret$jscomp$1$$;
    $filename$jscomp$16_ret$jscomp$1$$ = fs.readFileSync($filename$jscomp$16_ret$jscomp$1$$, void 0);
    $assert$$(Buffer.isBuffer($filename$jscomp$16_ret$jscomp$1$$));
    return $filename$jscomp$16_ret$jscomp$1$$;
  };
  1 < process.argv.length && ($thisProgram$$ = process.argv[1].replace(/\\/g, "/"));
  $arguments_$$ = process.argv.slice(2);
  "undefined" != typeof module && (module.exports = $Module$$);
  $quit_$$ = ($status$jscomp$1$$, $toThrow$jscomp$1$$) => {
    process.exitCode = $status$jscomp$1$$;
    throw $toThrow$jscomp$1$$;
  };
} else if ($ENVIRONMENT_IS_SHELL$$) {
  if ("object" == typeof process && process.versions?.node && "renderer" != process.type || "object" == typeof window || "undefined" != typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
} else if ($ENVIRONMENT_IS_WEB$$ || $ENVIRONMENT_IS_WORKER$$) {
  try {
    $scriptDirectory$$ = (new URL(".", $_scriptName$$)).href;
  } catch {
  }
  if ("object" != typeof window && "undefined" == typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  $ENVIRONMENT_IS_WORKER$$ && ($readBinary$$ = $url$jscomp$26$$ => {
    var $xhr$$ = new XMLHttpRequest();
    $xhr$$.open("GET", $url$jscomp$26$$, !1);
    $xhr$$.responseType = "arraybuffer";
    $xhr$$.send(null);
    return new Uint8Array($xhr$$.response);
  });
  $readAsync$$ = async $url$jscomp$27$$ => {
    if ($isFileURI$$($url$jscomp$27$$)) {
      return new Promise(($resolve$$, $reject$$) => {
        var $xhr$jscomp$1$$ = new XMLHttpRequest();
        $xhr$jscomp$1$$.open("GET", $url$jscomp$27$$, !0);
        $xhr$jscomp$1$$.responseType = "arraybuffer";
        $xhr$jscomp$1$$.onload = () => {
          200 == $xhr$jscomp$1$$.status || 0 == $xhr$jscomp$1$$.status && $xhr$jscomp$1$$.response ? $resolve$$($xhr$jscomp$1$$.response) : $reject$$($xhr$jscomp$1$$.status);
        };
        $xhr$jscomp$1$$.onerror = $reject$$;
        $xhr$jscomp$1$$.send(null);
      });
    }
    var $response$jscomp$3$$ = await fetch($url$jscomp$27$$, {credentials:"same-origin"});
    if ($response$jscomp$3$$.ok) {
      return $response$jscomp$3$$.arrayBuffer();
    }
    throw Error($response$jscomp$3$$.status + " : " + $response$jscomp$3$$.url);
  };
} else {
  throw Error("environment detection error");
}
var $out$$ = console.log.bind(console), $err$$ = console.error.bind(console);
$assert$$(!$ENVIRONMENT_IS_SHELL$$, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var $wasmBinary$$;
"object" != typeof WebAssembly && $err$$("no native wasm support detected");
var $ABORT$$ = !1, $EXITSTATUS$$;
function $assert$$($condition$jscomp$2$$, $text$jscomp$12$$) {
  $condition$jscomp$2$$ || $abort$$("Assertion failed" + ($text$jscomp$12$$ ? ": " + $text$jscomp$12$$ : ""));
}
var $isFileURI$$ = $filename$jscomp$17$$ => $filename$jscomp$17$$.startsWith("file://");
function $writeStackCookie$$() {
  var $max$$ = $_emscripten_stack_get_end$$();
  $assert$$(0 == ($max$$ & 3));
  0 == $max$$ && ($max$$ += 4);
  $HEAPU32$$[$max$$ >> 2] = 34821223;
  $HEAPU32$$[$max$$ + 4 >> 2] = 2310721022;
  $HEAPU32$$[0] = 1668509029;
}
function $checkStackCookie$$() {
  if (!$ABORT$$) {
    var $max$jscomp$1$$ = $_emscripten_stack_get_end$$();
    0 == $max$jscomp$1$$ && ($max$jscomp$1$$ += 4);
    var $cookie1$$ = $HEAPU32$$[$max$jscomp$1$$ >> 2], $cookie2$$ = $HEAPU32$$[$max$jscomp$1$$ + 4 >> 2];
    34821223 == $cookie1$$ && 2310721022 == $cookie2$$ || $abort$$(`Stack overflow! Stack cookie has been overwritten at ${$ptrToString$$($max$jscomp$1$$)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${$ptrToString$$($cookie2$$)} ${$ptrToString$$($cookie1$$)}`);
    1668509029 != $HEAPU32$$[0] && $abort$$("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
class $EmscriptenEH$$ extends Error {
}
class $EmscriptenSjLj$$ extends $EmscriptenEH$$ {
}
class $CppException$$ extends $EmscriptenEH$$ {
  constructor($excInfo_excPtr$$) {
    super($excInfo_excPtr$$);
    this.$g$ = $excInfo_excPtr$$;
    $excInfo_excPtr$$ = $getExceptionMessageCommon$$($excInfo_excPtr$$);
    this.name = $excInfo_excPtr$$[0];
    this.message = $excInfo_excPtr$$[1];
  }
}
var $h16$jscomp$inline_40$$ = new Int16Array(1), $h8$jscomp$inline_41$$ = new Int8Array($h16$jscomp$inline_40$$.buffer);
$h16$jscomp$inline_40$$[0] = 25459;
if (115 !== $h8$jscomp$inline_41$$[0] || 99 !== $h8$jscomp$inline_41$$[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
function $consumedModuleProp$$($prop$jscomp$2$$) {
  Object.getOwnPropertyDescriptor($Module$$, $prop$jscomp$2$$) || Object.defineProperty($Module$$, $prop$jscomp$2$$, {configurable:!0, set() {
    $abort$$(`Attempt to set \`Module.${$prop$jscomp$2$$}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
  }});
}
function $makeInvalidEarlyAccess$$($name$jscomp$82$$) {
  return () => $assert$$(!1, `call to '${$name$jscomp$82$$}' via reference taken before Wasm module initialization`);
}
function $isExportedByForceFilesystem$$($name$jscomp$83$$) {
  return "FS_createPath" === $name$jscomp$83$$ || "FS_createDataFile" === $name$jscomp$83$$ || "FS_createPreloadedFile" === $name$jscomp$83$$ || "FS_preloadFile" === $name$jscomp$83$$ || "FS_unlink" === $name$jscomp$83$$ || "addRunDependency" === $name$jscomp$83$$ || "FS_createLazyFile" === $name$jscomp$83$$ || "FS_createDevice" === $name$jscomp$83$$ || "removeRunDependency" === $name$jscomp$83$$;
}
function $hookGlobalSymbolAccess$$($sym$jscomp$2$$, $func$jscomp$7$$) {
  "undefined" == typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, $sym$jscomp$2$$) || Object.defineProperty(globalThis, $sym$jscomp$2$$, {configurable:!0, get() {
    $func$jscomp$7$$();
  }});
}
function $missingGlobal$$($sym$jscomp$3$$, $msg$jscomp$1$$) {
  $hookGlobalSymbolAccess$$($sym$jscomp$3$$, () => {
    $warnOnce$$(`\`${$sym$jscomp$3$$}\` is no longer defined by emscripten. ${$msg$jscomp$1$$}`);
  });
}
$missingGlobal$$("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
$missingGlobal$$("asm", "Please use wasmExports instead");
function $unexportedRuntimeSymbol$$($sym$jscomp$5$$) {
  Object.getOwnPropertyDescriptor($Module$$, $sym$jscomp$5$$) || Object.defineProperty($Module$$, $sym$jscomp$5$$, {configurable:!0, get() {
    var $msg$jscomp$3$$ = `'${$sym$jscomp$5$$}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    $isExportedByForceFilesystem$$($sym$jscomp$5$$) && ($msg$jscomp$3$$ += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    $abort$$($msg$jscomp$3$$);
  }});
}
var $wasmMemory$$, $HEAP8$$, $HEAPU8$$, $HEAP16$$, $HEAPU16$$, $HEAP32$$, $HEAPU32$$, $HEAPF32$$, $HEAPF64$$, $HEAP64$$, $HEAPU64$$, $runtimeInitialized$$ = !1;
function $updateMemoryViews$$() {
  var $b$jscomp$2$$ = $wasmMemory$$.buffer;
  $HEAP8$$ = new Int8Array($b$jscomp$2$$);
  $HEAP16$$ = new Int16Array($b$jscomp$2$$);
  $HEAPU8$$ = new Uint8Array($b$jscomp$2$$);
  $HEAPU16$$ = new Uint16Array($b$jscomp$2$$);
  $HEAP32$$ = new Int32Array($b$jscomp$2$$);
  $HEAPU32$$ = new Uint32Array($b$jscomp$2$$);
  $HEAPF32$$ = new Float32Array($b$jscomp$2$$);
  $HEAPF64$$ = new Float64Array($b$jscomp$2$$);
  $HEAP64$$ = new BigInt64Array($b$jscomp$2$$);
  $HEAPU64$$ = new BigUint64Array($b$jscomp$2$$);
}
$assert$$("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
function $abort$$($what$$) {
  $Module$$.onAbort?.($what$$);
  $what$$ = "Aborted(" + $what$$ + ")";
  $err$$($what$$);
  $ABORT$$ = !0;
  throw new WebAssembly.RuntimeError($what$$);
}
function $createExportWrapper$$($name$jscomp$84$$, $nargs$$) {
  return (...$args$jscomp$7$$) => {
    $assert$$($runtimeInitialized$$, `native function \`${$name$jscomp$84$$}\` called before runtime initialization`);
    var $f$jscomp$1$$ = $wasmExports$$[$name$jscomp$84$$];
    $assert$$($f$jscomp$1$$, `exported native function \`${$name$jscomp$84$$}\` not found`);
    $assert$$($args$jscomp$7$$.length <= $nargs$$, `native function \`${$name$jscomp$84$$}\` called with ${$args$jscomp$7$$.length} args but expects ${$nargs$$}`);
    return $f$jscomp$1$$(...$args$jscomp$7$$);
  };
}
var $wasmBinaryFile$$;
async function $getWasmBinary$$($JSCompiler_inline_result$jscomp$1_binaryFile$$) {
  if (!$wasmBinary$$) {
    try {
      var $response$jscomp$4$$ = await $readAsync$$($JSCompiler_inline_result$jscomp$1_binaryFile$$);
      return new Uint8Array($response$jscomp$4$$);
    } catch {
    }
  }
  if ($JSCompiler_inline_result$jscomp$1_binaryFile$$ == $wasmBinaryFile$$ && $wasmBinary$$) {
    $JSCompiler_inline_result$jscomp$1_binaryFile$$ = new Uint8Array($wasmBinary$$);
  } else {
    if ($readBinary$$) {
      $JSCompiler_inline_result$jscomp$1_binaryFile$$ = $readBinary$$($JSCompiler_inline_result$jscomp$1_binaryFile$$);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  return $JSCompiler_inline_result$jscomp$1_binaryFile$$;
}
async function $instantiateArrayBuffer$$($binaryFile$jscomp$1$$, $imports$$) {
  try {
    var $binary$jscomp$1$$ = await $getWasmBinary$$($binaryFile$jscomp$1$$);
    return await WebAssembly.instantiate($binary$jscomp$1$$, $imports$$);
  } catch ($reason$jscomp$9$$) {
    $err$$(`failed to asynchronously prepare wasm: ${$reason$jscomp$9$$}`), $isFileURI$$($wasmBinaryFile$$) && $err$$(`warning: Loading from a file URI (${$wasmBinaryFile$$}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), $abort$$($reason$jscomp$9$$);
  }
}
async function $instantiateAsync$$($imports$jscomp$1$$) {
  var $binaryFile$jscomp$2$$ = $wasmBinaryFile$$;
  if (!$wasmBinary$$ && !$isFileURI$$($binaryFile$jscomp$2$$) && !$ENVIRONMENT_IS_NODE$$) {
    try {
      var $response$jscomp$5$$ = fetch($binaryFile$jscomp$2$$, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming($response$jscomp$5$$, $imports$jscomp$1$$);
    } catch ($reason$jscomp$10$$) {
      $err$$(`wasm streaming compile failed: ${$reason$jscomp$10$$}`), $err$$("falling back to ArrayBuffer instantiation");
    }
  }
  return $instantiateArrayBuffer$$($binaryFile$jscomp$2$$, $imports$jscomp$1$$);
}
class $ExitStatus$$ {
  name="ExitStatus";
  constructor($status$jscomp$2$$) {
    this.message = `Program terminated with exit(${$status$jscomp$2$$})`;
    this.status = $status$jscomp$2$$;
  }
}
var $callRuntimeCallbacks$$ = $callbacks$$ => {
  for (; 0 < $callbacks$$.length;) {
    $callbacks$$.shift()($Module$$);
  }
}, $onPostRuns$$ = [], $onPreRuns$$ = [], $addOnPreRun$$ = () => {
  var $cb$jscomp$7$$ = $Module$$.preRun.shift();
  $onPreRuns$$.push($cb$jscomp$7$$);
}, $runDependencies$$ = 0, $dependenciesFulfilled$$ = null, $runDependencyTracking$$ = {}, $runDependencyWatcher$$ = null, $removeRunDependency$$ = $callback$jscomp$131_id$jscomp$8$$ => {
  $runDependencies$$--;
  $Module$$.monitorRunDependencies?.($runDependencies$$);
  $assert$$($callback$jscomp$131_id$jscomp$8$$, "removeRunDependency requires an ID");
  $assert$$($runDependencyTracking$$[$callback$jscomp$131_id$jscomp$8$$]);
  delete $runDependencyTracking$$[$callback$jscomp$131_id$jscomp$8$$];
  0 == $runDependencies$$ && (null !== $runDependencyWatcher$$ && (clearInterval($runDependencyWatcher$$), $runDependencyWatcher$$ = null), $dependenciesFulfilled$$ && ($callback$jscomp$131_id$jscomp$8$$ = $dependenciesFulfilled$$, $dependenciesFulfilled$$ = null, $callback$jscomp$131_id$jscomp$8$$()));
}, $addRunDependency$$ = $id$jscomp$9$$ => {
  $runDependencies$$++;
  $Module$$.monitorRunDependencies?.($runDependencies$$);
  $assert$$($id$jscomp$9$$, "addRunDependency requires an ID");
  $assert$$(!$runDependencyTracking$$[$id$jscomp$9$$]);
  $runDependencyTracking$$[$id$jscomp$9$$] = 1;
  null === $runDependencyWatcher$$ && "undefined" != typeof setInterval && ($runDependencyWatcher$$ = setInterval(() => {
    if ($ABORT$$) {
      clearInterval($runDependencyWatcher$$), $runDependencyWatcher$$ = null;
    } else {
      var $shown$$ = !1, $dep$$;
      for ($dep$$ in $runDependencyTracking$$) {
        $shown$$ || ($shown$$ = !0, $err$$("still waiting on run dependencies:")), $err$$(`dependency: ${$dep$$}`);
      }
      $shown$$ && $err$$("(end of list)");
    }
  }, 10000), $runDependencyWatcher$$.unref?.());
}, $noExitRuntime$$ = !0, $ptrToString$$ = $ptr$jscomp$1$$ => {
  $assert$$("number" === typeof $ptr$jscomp$1$$);
  return "0x" + ($ptr$jscomp$1$$ >>> 0).toString(16).padStart(8, "0");
};
function $setValue$$($ptr$jscomp$2$$, $value$jscomp$111$$) {
  var $type$jscomp$171$$ = "float";
  $type$jscomp$171$$.endsWith("*") && ($type$jscomp$171$$ = "*");
  switch($type$jscomp$171$$) {
    case "i1":
      $HEAP8$$[$ptr$jscomp$2$$] = $value$jscomp$111$$;
      break;
    case "i8":
      $HEAP8$$[$ptr$jscomp$2$$] = $value$jscomp$111$$;
      break;
    case "i16":
      $HEAP16$$[$ptr$jscomp$2$$ >> 1] = $value$jscomp$111$$;
      break;
    case "i32":
      $HEAP32$$[$ptr$jscomp$2$$ >> 2] = $value$jscomp$111$$;
      break;
    case "i64":
      $HEAP64$$[$ptr$jscomp$2$$ >> 3] = BigInt($value$jscomp$111$$);
      break;
    case "float":
      $HEAPF32$$[$ptr$jscomp$2$$ >> 2] = $value$jscomp$111$$;
      break;
    case "double":
      $HEAPF64$$[$ptr$jscomp$2$$ >> 3] = $value$jscomp$111$$;
      break;
    case "*":
      $HEAPU32$$[$ptr$jscomp$2$$ >> 2] = $value$jscomp$111$$;
      break;
    default:
      $abort$$(`invalid type for setValue: ${$type$jscomp$171$$}`);
  }
}
var $warnOnce$$ = $text$jscomp$13$$ => {
  $warnOnce$$.$shown$ || ($warnOnce$$.$shown$ = {});
  $warnOnce$$.$shown$[$text$jscomp$13$$] || ($warnOnce$$.$shown$[$text$jscomp$13$$] = 1, $ENVIRONMENT_IS_NODE$$ && ($text$jscomp$13$$ = "warning: " + $text$jscomp$13$$), $err$$($text$jscomp$13$$));
}, $UTF8Decoder$$ = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, $findStringEnd$$ = ($heapOrArray$$, $idx$$, $maxBytesToRead_maxIdx$$, $ignoreNul$$) => {
  $maxBytesToRead_maxIdx$$ = $idx$$ + $maxBytesToRead_maxIdx$$;
  if ($ignoreNul$$) {
    return $maxBytesToRead_maxIdx$$;
  }
  for (; $heapOrArray$$[$idx$$] && !($idx$$ >= $maxBytesToRead_maxIdx$$);) {
    ++$idx$$;
  }
  return $idx$$;
}, $UTF8ArrayToString$$ = ($heapOrArray$jscomp$1$$, $idx$jscomp$1$$ = 0, $endPtr_maxBytesToRead$jscomp$1$$, $ignoreNul$jscomp$1_str$jscomp$9$$) => {
  $endPtr_maxBytesToRead$jscomp$1$$ = $findStringEnd$$($heapOrArray$jscomp$1$$, $idx$jscomp$1$$, $endPtr_maxBytesToRead$jscomp$1$$, $ignoreNul$jscomp$1_str$jscomp$9$$);
  if (16 < $endPtr_maxBytesToRead$jscomp$1$$ - $idx$jscomp$1$$ && $heapOrArray$jscomp$1$$.buffer && $UTF8Decoder$$) {
    return $UTF8Decoder$$.decode($heapOrArray$jscomp$1$$.subarray($idx$jscomp$1$$, $endPtr_maxBytesToRead$jscomp$1$$));
  }
  for ($ignoreNul$jscomp$1_str$jscomp$9$$ = ""; $idx$jscomp$1$$ < $endPtr_maxBytesToRead$jscomp$1$$;) {
    var $ch_u0$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++];
    if ($ch_u0$$ & 128) {
      var $u1$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63;
      if (192 == ($ch_u0$$ & 224)) {
        $ignoreNul$jscomp$1_str$jscomp$9$$ += String.fromCharCode(($ch_u0$$ & 31) << 6 | $u1$$);
      } else {
        var $u2$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63;
        224 == ($ch_u0$$ & 240) ? $ch_u0$$ = ($ch_u0$$ & 15) << 12 | $u1$$ << 6 | $u2$$ : (240 != ($ch_u0$$ & 248) && $warnOnce$$("Invalid UTF-8 leading byte " + $ptrToString$$($ch_u0$$) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), $ch_u0$$ = ($ch_u0$$ & 7) << 18 | $u1$$ << 12 | $u2$$ << 6 | $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63);
        65536 > $ch_u0$$ ? $ignoreNul$jscomp$1_str$jscomp$9$$ += String.fromCharCode($ch_u0$$) : ($ch_u0$$ -= 65536, $ignoreNul$jscomp$1_str$jscomp$9$$ += String.fromCharCode(55296 | $ch_u0$$ >> 10, 56320 | $ch_u0$$ & 1023));
      }
    } else {
      $ignoreNul$jscomp$1_str$jscomp$9$$ += String.fromCharCode($ch_u0$$);
    }
  }
  return $ignoreNul$jscomp$1_str$jscomp$9$$;
}, $UTF8ToString$$ = ($ptr$jscomp$3$$, $maxBytesToRead$jscomp$2$$, $ignoreNul$jscomp$2$$) => {
  $assert$$("number" == typeof $ptr$jscomp$3$$, `UTF8ToString expects a number (got ${typeof $ptr$jscomp$3$$})`);
  return $ptr$jscomp$3$$ ? $UTF8ArrayToString$$($HEAPU8$$, $ptr$jscomp$3$$, $maxBytesToRead$jscomp$2$$, $ignoreNul$jscomp$2$$) : "";
}, $exceptionCaught$$ = [], $uncaughtExceptionCount$$ = 0, $exceptionLast$$ = 0;
class $ExceptionInfo$$ {
  constructor($excPtr$jscomp$1$$) {
    this.$ptr$ = $excPtr$jscomp$1$$ - 24;
  }
}
var $findMatchingCatch$$ = $args$jscomp$8$$ => {
  var $thrown$$ = $exceptionLast$$?.$g$;
  if (!$thrown$$) {
    return $__emscripten_tempret_set$$(0), 0;
  }
  var $info$jscomp$2$$ = new $ExceptionInfo$$($thrown$$);
  $HEAPU32$$[$info$jscomp$2$$.$ptr$ + 16 >> 2] = $thrown$$;
  var $thrownType$$ = $HEAPU32$$[$info$jscomp$2$$.$ptr$ + 4 >> 2];
  if (!$thrownType$$) {
    return $__emscripten_tempret_set$$(0), $thrown$$;
  }
  for (var $caughtType$$ of $args$jscomp$8$$) {
    if (0 === $caughtType$$ || $caughtType$$ === $thrownType$$) {
      break;
    }
    if ($___cxa_can_catch$$($caughtType$$, $thrownType$$, $info$jscomp$2$$.$ptr$ + 16)) {
      return $__emscripten_tempret_set$$($caughtType$$), $thrown$$;
    }
  }
  $__emscripten_tempret_set$$($thrownType$$);
  return $thrown$$;
}, $syscallGetVarargI$$ = () => {
  $assert$$(void 0 != $SYSCALLS$varargs$$);
  var $ret$jscomp$2$$ = $HEAP32$$[+$SYSCALLS$varargs$$ >> 2];
  $SYSCALLS$varargs$$ += 4;
  return $ret$jscomp$2$$;
}, $PATH$normalizeArray$$ = ($parts$$, $allowAboveRoot$$) => {
  for (var $up$$ = 0, $i$jscomp$4$$ = $parts$$.length - 1; 0 <= $i$jscomp$4$$; $i$jscomp$4$$--) {
    var $last$$ = $parts$$[$i$jscomp$4$$];
    "." === $last$$ ? $parts$$.splice($i$jscomp$4$$, 1) : ".." === $last$$ ? ($parts$$.splice($i$jscomp$4$$, 1), $up$$++) : $up$$ && ($parts$$.splice($i$jscomp$4$$, 1), $up$$--);
  }
  if ($allowAboveRoot$$) {
    for (; $up$$; $up$$--) {
      $parts$$.unshift("..");
    }
  }
  return $parts$$;
}, $PATH$normalize$$ = $path$jscomp$41$$ => {
  var $isAbsolute$$ = "/" === $path$jscomp$41$$.charAt(0), $trailingSlash$$ = "/" === $path$jscomp$41$$.slice(-1);
  ($path$jscomp$41$$ = $PATH$normalizeArray$$($path$jscomp$41$$.split("/").filter($p$jscomp$4$$ => !!$p$jscomp$4$$), !$isAbsolute$$).join("/")) || $isAbsolute$$ || ($path$jscomp$41$$ = ".");
  $path$jscomp$41$$ && $trailingSlash$$ && ($path$jscomp$41$$ += "/");
  return ($isAbsolute$$ ? "/" : "") + $path$jscomp$41$$;
}, $PATH$dirname$$ = $path$jscomp$42_root$jscomp$3$$ => {
  var $dir_result$jscomp$3$$ = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec($path$jscomp$42_root$jscomp$3$$).slice(1);
  $path$jscomp$42_root$jscomp$3$$ = $dir_result$jscomp$3$$[0];
  $dir_result$jscomp$3$$ = $dir_result$jscomp$3$$[1];
  if (!$path$jscomp$42_root$jscomp$3$$ && !$dir_result$jscomp$3$$) {
    return ".";
  }
  $dir_result$jscomp$3$$ &&= $dir_result$jscomp$3$$.slice(0, -1);
  return $path$jscomp$42_root$jscomp$3$$ + $dir_result$jscomp$3$$;
}, $PATH$basename$$ = $path$jscomp$43$$ => $path$jscomp$43$$ && $path$jscomp$43$$.match(/([^\/]+|\/)\/*$/)[1], $initRandomFill$$ = () => {
  if ($ENVIRONMENT_IS_NODE$$) {
    var $nodeCrypto$$ = require("crypto");
    return $view$jscomp$5$$ => $nodeCrypto$$.randomFillSync($view$jscomp$5$$);
  }
  return $view$jscomp$6$$ => crypto.getRandomValues($view$jscomp$6$$);
}, $randomFill$$ = $view$jscomp$7$$ => {
  ($randomFill$$ = $initRandomFill$$())($view$jscomp$7$$);
}, $PATH_FS$resolve$$ = (...$args$jscomp$9$$) => {
  for (var $resolvedPath$$ = "", $path$jscomp$44_resolvedAbsolute$$ = !1, $i$jscomp$5$$ = $args$jscomp$9$$.length - 1; -1 <= $i$jscomp$5$$ && !$path$jscomp$44_resolvedAbsolute$$; $i$jscomp$5$$--) {
    $path$jscomp$44_resolvedAbsolute$$ = 0 <= $i$jscomp$5$$ ? $args$jscomp$9$$[$i$jscomp$5$$] : "/";
    if ("string" != typeof $path$jscomp$44_resolvedAbsolute$$) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!$path$jscomp$44_resolvedAbsolute$$) {
      return "";
    }
    $resolvedPath$$ = $path$jscomp$44_resolvedAbsolute$$ + "/" + $resolvedPath$$;
    $path$jscomp$44_resolvedAbsolute$$ = "/" === $path$jscomp$44_resolvedAbsolute$$.charAt(0);
  }
  $resolvedPath$$ = $PATH$normalizeArray$$($resolvedPath$$.split("/").filter($p$jscomp$5$$ => !!$p$jscomp$5$$), !$path$jscomp$44_resolvedAbsolute$$).join("/");
  return ($path$jscomp$44_resolvedAbsolute$$ ? "/" : "") + $resolvedPath$$ || ".";
}, $FS_stdin_getChar_buffer$$ = [], $lengthBytesUTF8$$ = $str$jscomp$10$$ => {
  for (var $len$jscomp$3$$ = 0, $i$jscomp$7$$ = 0; $i$jscomp$7$$ < $str$jscomp$10$$.length; ++$i$jscomp$7$$) {
    var $c$jscomp$1$$ = $str$jscomp$10$$.charCodeAt($i$jscomp$7$$);
    127 >= $c$jscomp$1$$ ? $len$jscomp$3$$++ : 2047 >= $c$jscomp$1$$ ? $len$jscomp$3$$ += 2 : 55296 <= $c$jscomp$1$$ && 57343 >= $c$jscomp$1$$ ? ($len$jscomp$3$$ += 4, ++$i$jscomp$7$$) : $len$jscomp$3$$ += 3;
  }
  return $len$jscomp$3$$;
}, $stringToUTF8Array$$ = ($str$jscomp$11$$, $heap$$, $outIdx$$, $endIdx_maxBytesToWrite$$) => {
  $assert$$("string" === typeof $str$jscomp$11$$, `stringToUTF8Array expects a string (got ${typeof $str$jscomp$11$$})`);
  if (!(0 < $endIdx_maxBytesToWrite$$)) {
    return 0;
  }
  var $startIdx$$ = $outIdx$$;
  $endIdx_maxBytesToWrite$$ = $outIdx$$ + $endIdx_maxBytesToWrite$$ - 1;
  for (var $i$jscomp$8$$ = 0; $i$jscomp$8$$ < $str$jscomp$11$$.length; ++$i$jscomp$8$$) {
    var $u$$ = $str$jscomp$11$$.codePointAt($i$jscomp$8$$);
    if (127 >= $u$$) {
      if ($outIdx$$ >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++] = $u$$;
    } else if (2047 >= $u$$) {
      if ($outIdx$$ + 1 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++] = 192 | $u$$ >> 6;
      $heap$$[$outIdx$$++] = 128 | $u$$ & 63;
    } else if (65535 >= $u$$) {
      if ($outIdx$$ + 2 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++] = 224 | $u$$ >> 12;
      $heap$$[$outIdx$$++] = 128 | $u$$ >> 6 & 63;
      $heap$$[$outIdx$$++] = 128 | $u$$ & 63;
    } else {
      if ($outIdx$$ + 3 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      1114111 < $u$$ && $warnOnce$$("Invalid Unicode code point " + $ptrToString$$($u$$) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      $heap$$[$outIdx$$++] = 240 | $u$$ >> 18;
      $heap$$[$outIdx$$++] = 128 | $u$$ >> 12 & 63;
      $heap$$[$outIdx$$++] = 128 | $u$$ >> 6 & 63;
      $heap$$[$outIdx$$++] = 128 | $u$$ & 63;
      $i$jscomp$8$$++;
    }
  }
  $heap$$[$outIdx$$] = 0;
  return $outIdx$$ - $startIdx$$;
}, $intArrayFromString$$ = $numBytesWritten_stringy$$ => {
  var $u8array$$ = Array($lengthBytesUTF8$$($numBytesWritten_stringy$$) + 1);
  $numBytesWritten_stringy$$ = $stringToUTF8Array$$($numBytesWritten_stringy$$, $u8array$$, 0, $u8array$$.length);
  $u8array$$.length = $numBytesWritten_stringy$$;
  return $u8array$$;
}, $TTY$ttys$$ = [];
function $TTY$register$$($dev$$, $ops$$) {
  $TTY$ttys$$[$dev$$] = {input:[], output:[], $ops$:$ops$$};
  $FS$registerDevice$$($dev$$, $TTY$stream_ops$$);
}
var $TTY$stream_ops$$ = {open($stream$jscomp$6$$) {
  var $tty$jscomp$1$$ = $TTY$ttys$$[$stream$jscomp$6$$.node.rdev];
  if (!$tty$jscomp$1$$) {
    throw new $FS$ErrnoError$$(43);
  }
  $stream$jscomp$6$$.tty = $tty$jscomp$1$$;
  $stream$jscomp$6$$.seekable = !1;
}, close($stream$jscomp$7$$) {
  $stream$jscomp$7$$.tty.$ops$.fsync($stream$jscomp$7$$.tty);
}, fsync($stream$jscomp$8$$) {
  $stream$jscomp$8$$.tty.$ops$.fsync($stream$jscomp$8$$.tty);
}, read($stream$jscomp$9$$, $buffer$jscomp$27$$, $offset$jscomp$68$$, $length$jscomp$27$$) {
  if (!$stream$jscomp$9$$.tty || !$stream$jscomp$9$$.tty.$ops$.$get_char$) {
    throw new $FS$ErrnoError$$(60);
  }
  for (var $bytesRead$jscomp$1$$ = 0, $i$jscomp$9$$ = 0; $i$jscomp$9$$ < $length$jscomp$27$$; $i$jscomp$9$$++) {
    try {
      var $result$jscomp$5$$ = $stream$jscomp$9$$.tty.$ops$.$get_char$($stream$jscomp$9$$.tty);
    } catch ($e$jscomp$11$$) {
      throw new $FS$ErrnoError$$(29);
    }
    if (void 0 === $result$jscomp$5$$ && 0 === $bytesRead$jscomp$1$$) {
      throw new $FS$ErrnoError$$(6);
    }
    if (null === $result$jscomp$5$$ || void 0 === $result$jscomp$5$$) {
      break;
    }
    $bytesRead$jscomp$1$$++;
    $buffer$jscomp$27$$[$offset$jscomp$68$$ + $i$jscomp$9$$] = $result$jscomp$5$$;
  }
  $bytesRead$jscomp$1$$ && ($stream$jscomp$9$$.node.atime = Date.now());
  return $bytesRead$jscomp$1$$;
}, write($stream$jscomp$10$$, $buffer$jscomp$28$$, $offset$jscomp$69$$, $length$jscomp$28$$) {
  if (!$stream$jscomp$10$$.tty || !$stream$jscomp$10$$.tty.$ops$.$put_char$) {
    throw new $FS$ErrnoError$$(60);
  }
  try {
    for (var $i$jscomp$10$$ = 0; $i$jscomp$10$$ < $length$jscomp$28$$; $i$jscomp$10$$++) {
      $stream$jscomp$10$$.tty.$ops$.$put_char$($stream$jscomp$10$$.tty, $buffer$jscomp$28$$[$offset$jscomp$69$$ + $i$jscomp$10$$]);
    }
  } catch ($e$jscomp$12$$) {
    throw new $FS$ErrnoError$$(29);
  }
  $length$jscomp$28$$ && ($stream$jscomp$10$$.node.mtime = $stream$jscomp$10$$.node.ctime = Date.now());
  return $i$jscomp$10$$;
}}, $TTY$default_tty_ops$$ = {$get_char$() {
  a: {
    if (!$FS_stdin_getChar_buffer$$.length) {
      var $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$ = null;
      if ($ENVIRONMENT_IS_NODE$$) {
        var $buf$jscomp$inline_54$$ = Buffer.alloc(256), $bytesRead$jscomp$inline_55$$ = 0, $fd$jscomp$inline_56$$ = process.stdin.fd;
        try {
          $bytesRead$jscomp$inline_55$$ = fs.readSync($fd$jscomp$inline_56$$, $buf$jscomp$inline_54$$, 0, 256);
        } catch ($e$jscomp$inline_57$$) {
          if ($e$jscomp$inline_57$$.toString().includes("EOF")) {
            $bytesRead$jscomp$inline_55$$ = 0;
          } else {
            throw $e$jscomp$inline_57$$;
          }
        }
        0 < $bytesRead$jscomp$inline_55$$ && ($JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$ = $buf$jscomp$inline_54$$.slice(0, $bytesRead$jscomp$inline_55$$).toString("utf-8"));
      } else {
        "undefined" != typeof window && "function" == typeof window.prompt && ($JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$ = window.prompt("Input: "), null !== $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$ && ($JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$ += "\n"));
      }
      if (!$JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$) {
        $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$ = null;
        break a;
      }
      $FS_stdin_getChar_buffer$$ = $intArrayFromString$$($JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$);
    }
    $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$ = $FS_stdin_getChar_buffer$$.shift();
  }
  return $JSCompiler_inline_result$jscomp$2_result$jscomp$inline_53$$;
}, $put_char$($tty$jscomp$3$$, $val$jscomp$2$$) {
  null === $val$jscomp$2$$ || 10 === $val$jscomp$2$$ ? ($out$$($UTF8ArrayToString$$($tty$jscomp$3$$.output)), $tty$jscomp$3$$.output = []) : 0 != $val$jscomp$2$$ && $tty$jscomp$3$$.output.push($val$jscomp$2$$);
}, fsync($tty$jscomp$4$$) {
  0 < $tty$jscomp$4$$.output?.length && ($out$$($UTF8ArrayToString$$($tty$jscomp$4$$.output)), $tty$jscomp$4$$.output = []);
}, $ioctl_tcgets$() {
  return {$c_iflag$:25856, $c_oflag$:5, $c_cflag$:191, $c_lflag$:35387, $c_cc$:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, $ioctl_tcsets$() {
  return 0;
}, $ioctl_tiocgwinsz$() {
  return [24, 80];
}}, $TTY$default_tty1_ops$$ = {$put_char$($tty$jscomp$8$$, $val$jscomp$3$$) {
  null === $val$jscomp$3$$ || 10 === $val$jscomp$3$$ ? ($err$$($UTF8ArrayToString$$($tty$jscomp$8$$.output)), $tty$jscomp$8$$.output = []) : 0 != $val$jscomp$3$$ && $tty$jscomp$8$$.output.push($val$jscomp$3$$);
}, fsync($tty$jscomp$9$$) {
  0 < $tty$jscomp$9$$.output?.length && ($err$$($UTF8ArrayToString$$($tty$jscomp$9$$.output)), $tty$jscomp$9$$.output = []);
}}, $alignMemory$$ = $size$jscomp$24$$ => {
  $assert$$(65536, "alignment argument is required");
  return 65536 * Math.ceil($size$jscomp$24$$ / 65536);
}, $mmapAlloc$$ = $size$jscomp$25$$ => {
  $size$jscomp$25$$ = $alignMemory$$($size$jscomp$25$$);
  var $ptr$jscomp$8$$ = $_emscripten_builtin_memalign$$(65536, $size$jscomp$25$$);
  $ptr$jscomp$8$$ && $HEAPU8$$.fill(0, $ptr$jscomp$8$$, $ptr$jscomp$8$$ + $size$jscomp$25$$);
  return $ptr$jscomp$8$$;
}, $MEMFS$$ = {$ops_table$:null, $mount$() {
  return $MEMFS$$.createNode(null, "/", 16895, 0);
}, createNode($parent$jscomp$4$$, $name$jscomp$85$$, $mode$jscomp$27_node$jscomp$5$$, $dev$jscomp$1$$) {
  if (24576 === ($mode$jscomp$27_node$jscomp$5$$ & 61440) || 4096 === ($mode$jscomp$27_node$jscomp$5$$ & 61440)) {
    throw new $FS$ErrnoError$$(63);
  }
  $MEMFS$$.$ops_table$ || ($MEMFS$$.$ops_table$ = {dir:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$, lookup:$MEMFS$$.$node_ops$.lookup, $mknod$:$MEMFS$$.$node_ops$.$mknod$, rename:$MEMFS$$.$node_ops$.rename, unlink:$MEMFS$$.$node_ops$.unlink, rmdir:$MEMFS$$.$node_ops$.rmdir, readdir:$MEMFS$$.$node_ops$.readdir, symlink:$MEMFS$$.$node_ops$.symlink}, stream:{$llseek$:$MEMFS$$.$stream_ops$.$llseek$}}, file:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$}, 
  stream:{$llseek$:$MEMFS$$.$stream_ops$.$llseek$, read:$MEMFS$$.$stream_ops$.read, write:$MEMFS$$.$stream_ops$.write, $mmap$:$MEMFS$$.$stream_ops$.$mmap$, $msync$:$MEMFS$$.$stream_ops$.$msync$}}, link:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$, readlink:$MEMFS$$.$node_ops$.readlink}, stream:{}}, $chrdev$:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$}, stream:$FS$chrdev_stream_ops$$}});
  $mode$jscomp$27_node$jscomp$5$$ = $FS$createNode$$($parent$jscomp$4$$, $name$jscomp$85$$, $mode$jscomp$27_node$jscomp$5$$, $dev$jscomp$1$$);
  $FS$isDir$$($mode$jscomp$27_node$jscomp$5$$.mode) ? ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.dir.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.dir.stream, $mode$jscomp$27_node$jscomp$5$$.$contents$ = {}) : 32768 === ($mode$jscomp$27_node$jscomp$5$$.mode & 61440) ? ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.file.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.file.stream, $mode$jscomp$27_node$jscomp$5$$.$usedBytes$ = 
  0, $mode$jscomp$27_node$jscomp$5$$.$contents$ = null) : 40960 === ($mode$jscomp$27_node$jscomp$5$$.mode & 61440) ? ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.link.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.link.stream) : 8192 === ($mode$jscomp$27_node$jscomp$5$$.mode & 61440) && ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.$chrdev$.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.$chrdev$.stream);
  $mode$jscomp$27_node$jscomp$5$$.atime = $mode$jscomp$27_node$jscomp$5$$.mtime = $mode$jscomp$27_node$jscomp$5$$.ctime = Date.now();
  $parent$jscomp$4$$ && ($parent$jscomp$4$$.$contents$[$name$jscomp$85$$] = $mode$jscomp$27_node$jscomp$5$$, $parent$jscomp$4$$.atime = $parent$jscomp$4$$.mtime = $parent$jscomp$4$$.ctime = $mode$jscomp$27_node$jscomp$5$$.atime);
  return $mode$jscomp$27_node$jscomp$5$$;
}, $getFileDataAsTypedArray$($node$jscomp$6$$) {
  return $node$jscomp$6$$.$contents$ ? $node$jscomp$6$$.$contents$.subarray ? $node$jscomp$6$$.$contents$.subarray(0, $node$jscomp$6$$.$usedBytes$) : new Uint8Array($node$jscomp$6$$.$contents$) : new Uint8Array(0);
}, $node_ops$:{$getattr$($node$jscomp$9$$) {
  var $attr$$ = {};
  $attr$$.dev = 8192 === ($node$jscomp$9$$.mode & 61440) ? $node$jscomp$9$$.id : 1;
  $attr$$.ino = $node$jscomp$9$$.id;
  $attr$$.mode = $node$jscomp$9$$.mode;
  $attr$$.nlink = 1;
  $attr$$.uid = 0;
  $attr$$.gid = 0;
  $attr$$.rdev = $node$jscomp$9$$.rdev;
  $FS$isDir$$($node$jscomp$9$$.mode) ? $attr$$.size = 4096 : 32768 === ($node$jscomp$9$$.mode & 61440) ? $attr$$.size = $node$jscomp$9$$.$usedBytes$ : 40960 === ($node$jscomp$9$$.mode & 61440) ? $attr$$.size = $node$jscomp$9$$.link.length : $attr$$.size = 0;
  $attr$$.atime = new Date($node$jscomp$9$$.atime);
  $attr$$.mtime = new Date($node$jscomp$9$$.mtime);
  $attr$$.ctime = new Date($node$jscomp$9$$.ctime);
  $attr$$.blksize = 4096;
  $attr$$.blocks = Math.ceil($attr$$.size / $attr$$.blksize);
  return $attr$$;
}, $setattr$($node$jscomp$10$$, $attr$jscomp$1_newSize$jscomp$inline_63$$) {
  for (var $key$jscomp$40_oldContents$jscomp$inline_65$$ of ["mode", "atime", "mtime", "ctime"]) {
    null != $attr$jscomp$1_newSize$jscomp$inline_63$$[$key$jscomp$40_oldContents$jscomp$inline_65$$] && ($node$jscomp$10$$[$key$jscomp$40_oldContents$jscomp$inline_65$$] = $attr$jscomp$1_newSize$jscomp$inline_63$$[$key$jscomp$40_oldContents$jscomp$inline_65$$]);
  }
  void 0 !== $attr$jscomp$1_newSize$jscomp$inline_63$$.size && ($attr$jscomp$1_newSize$jscomp$inline_63$$ = $attr$jscomp$1_newSize$jscomp$inline_63$$.size, $node$jscomp$10$$.$usedBytes$ != $attr$jscomp$1_newSize$jscomp$inline_63$$ && (0 == $attr$jscomp$1_newSize$jscomp$inline_63$$ ? ($node$jscomp$10$$.$contents$ = null, $node$jscomp$10$$.$usedBytes$ = 0) : ($key$jscomp$40_oldContents$jscomp$inline_65$$ = $node$jscomp$10$$.$contents$, $node$jscomp$10$$.$contents$ = new Uint8Array($attr$jscomp$1_newSize$jscomp$inline_63$$), 
  $key$jscomp$40_oldContents$jscomp$inline_65$$ && $node$jscomp$10$$.$contents$.set($key$jscomp$40_oldContents$jscomp$inline_65$$.subarray(0, Math.min($attr$jscomp$1_newSize$jscomp$inline_63$$, $node$jscomp$10$$.$usedBytes$))), $node$jscomp$10$$.$usedBytes$ = $attr$jscomp$1_newSize$jscomp$inline_63$$)));
}, lookup() {
  throw new $FS$ErrnoError$$(44);
}, $mknod$($parent$jscomp$6$$, $name$jscomp$87$$, $mode$jscomp$28$$, $dev$jscomp$2$$) {
  return $MEMFS$$.createNode($parent$jscomp$6$$, $name$jscomp$87$$, $mode$jscomp$28$$, $dev$jscomp$2$$);
}, rename($old_node$$, $new_dir$$, $new_name$$) {
  try {
    var $new_node$$ = $FS$lookupNode$$($new_dir$$, $new_name$$);
  } catch ($e$jscomp$13$$) {
  }
  if ($new_node$$) {
    if ($FS$isDir$$($old_node$$.mode)) {
      for (var $i$jscomp$11$$ in $new_node$$.$contents$) {
        throw new $FS$ErrnoError$$(55);
      }
    }
    $FS$hashRemoveNode$$($new_node$$);
  }
  delete $old_node$$.parent.$contents$[$old_node$$.name];
  $new_dir$$.$contents$[$new_name$$] = $old_node$$;
  $old_node$$.name = $new_name$$;
  $new_dir$$.ctime = $new_dir$$.mtime = $old_node$$.parent.ctime = $old_node$$.parent.mtime = Date.now();
}, unlink($parent$jscomp$7$$, $name$jscomp$88$$) {
  delete $parent$jscomp$7$$.$contents$[$name$jscomp$88$$];
  $parent$jscomp$7$$.ctime = $parent$jscomp$7$$.mtime = Date.now();
}, rmdir($parent$jscomp$8$$, $name$jscomp$89$$) {
  var $node$jscomp$11$$ = $FS$lookupNode$$($parent$jscomp$8$$, $name$jscomp$89$$), $i$jscomp$12$$;
  for ($i$jscomp$12$$ in $node$jscomp$11$$.$contents$) {
    throw new $FS$ErrnoError$$(55);
  }
  delete $parent$jscomp$8$$.$contents$[$name$jscomp$89$$];
  $parent$jscomp$8$$.ctime = $parent$jscomp$8$$.mtime = Date.now();
}, readdir($node$jscomp$12$$) {
  return [".", "..", ...Object.keys($node$jscomp$12$$.$contents$)];
}, symlink($node$jscomp$13_parent$jscomp$9$$, $newname$$, $oldpath$$) {
  $node$jscomp$13_parent$jscomp$9$$ = $MEMFS$$.createNode($node$jscomp$13_parent$jscomp$9$$, $newname$$, 41471, 0);
  $node$jscomp$13_parent$jscomp$9$$.link = $oldpath$$;
  return $node$jscomp$13_parent$jscomp$9$$;
}, readlink($node$jscomp$14$$) {
  if (40960 !== ($node$jscomp$14$$.mode & 61440)) {
    throw new $FS$ErrnoError$$(28);
  }
  return $node$jscomp$14$$.link;
}}, $stream_ops$:{read($size$jscomp$26_stream$jscomp$11$$, $buffer$jscomp$29$$, $offset$jscomp$70$$, $i$jscomp$13_length$jscomp$29$$, $position$jscomp$5$$) {
  var $contents$jscomp$3$$ = $size$jscomp$26_stream$jscomp$11$$.node.$contents$;
  if ($position$jscomp$5$$ >= $size$jscomp$26_stream$jscomp$11$$.node.$usedBytes$) {
    return 0;
  }
  $size$jscomp$26_stream$jscomp$11$$ = Math.min($size$jscomp$26_stream$jscomp$11$$.node.$usedBytes$ - $position$jscomp$5$$, $i$jscomp$13_length$jscomp$29$$);
  $assert$$(0 <= $size$jscomp$26_stream$jscomp$11$$);
  if (8 < $size$jscomp$26_stream$jscomp$11$$ && $contents$jscomp$3$$.subarray) {
    $buffer$jscomp$29$$.set($contents$jscomp$3$$.subarray($position$jscomp$5$$, $position$jscomp$5$$ + $size$jscomp$26_stream$jscomp$11$$), $offset$jscomp$70$$);
  } else {
    for ($i$jscomp$13_length$jscomp$29$$ = 0; $i$jscomp$13_length$jscomp$29$$ < $size$jscomp$26_stream$jscomp$11$$; $i$jscomp$13_length$jscomp$29$$++) {
      $buffer$jscomp$29$$[$offset$jscomp$70$$ + $i$jscomp$13_length$jscomp$29$$] = $contents$jscomp$3$$[$position$jscomp$5$$ + $i$jscomp$13_length$jscomp$29$$];
    }
  }
  return $size$jscomp$26_stream$jscomp$11$$;
}, write($node$jscomp$15_stream$jscomp$12$$, $buffer$jscomp$30$$, $offset$jscomp$71$$, $length$jscomp$30$$, $position$jscomp$6$$, $canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$) {
  $assert$$(!($buffer$jscomp$30$$ instanceof ArrayBuffer));
  $buffer$jscomp$30$$.buffer === $HEAP8$$.buffer && ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$ = !1);
  if (!$length$jscomp$30$$) {
    return 0;
  }
  $node$jscomp$15_stream$jscomp$12$$ = $node$jscomp$15_stream$jscomp$12$$.node;
  $node$jscomp$15_stream$jscomp$12$$.mtime = $node$jscomp$15_stream$jscomp$12$$.ctime = Date.now();
  if ($buffer$jscomp$30$$.subarray && (!$node$jscomp$15_stream$jscomp$12$$.$contents$ || $node$jscomp$15_stream$jscomp$12$$.$contents$.subarray)) {
    if ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$) {
      return $assert$$(0 === $position$jscomp$6$$, "canOwn must imply no weird position inside the file"), $node$jscomp$15_stream$jscomp$12$$.$contents$ = $buffer$jscomp$30$$.subarray($offset$jscomp$71$$, $offset$jscomp$71$$ + $length$jscomp$30$$), $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ = $length$jscomp$30$$;
    }
    if (0 === $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ && 0 === $position$jscomp$6$$) {
      return $node$jscomp$15_stream$jscomp$12$$.$contents$ = $buffer$jscomp$30$$.slice($offset$jscomp$71$$, $offset$jscomp$71$$ + $length$jscomp$30$$), $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ = $length$jscomp$30$$;
    }
    if ($position$jscomp$6$$ + $length$jscomp$30$$ <= $node$jscomp$15_stream$jscomp$12$$.$usedBytes$) {
      return $node$jscomp$15_stream$jscomp$12$$.$contents$.set($buffer$jscomp$30$$.subarray($offset$jscomp$71$$, $offset$jscomp$71$$ + $length$jscomp$30$$), $position$jscomp$6$$), $length$jscomp$30$$;
    }
  }
  $canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$ = $position$jscomp$6$$ + $length$jscomp$30$$;
  var $oldContents$jscomp$inline_71_prevCapacity$jscomp$inline_70$$ = $node$jscomp$15_stream$jscomp$12$$.$contents$ ? $node$jscomp$15_stream$jscomp$12$$.$contents$.length : 0;
  $oldContents$jscomp$inline_71_prevCapacity$jscomp$inline_70$$ >= $canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$ || ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$ = Math.max($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$, $oldContents$jscomp$inline_71_prevCapacity$jscomp$inline_70$$ * (1048576 > $oldContents$jscomp$inline_71_prevCapacity$jscomp$inline_70$$ ? 2.0 : 1.125) >>> 0), 0 != $oldContents$jscomp$inline_71_prevCapacity$jscomp$inline_70$$ && ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$ = 
  Math.max($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$, 256)), $oldContents$jscomp$inline_71_prevCapacity$jscomp$inline_70$$ = $node$jscomp$15_stream$jscomp$12$$.$contents$, $node$jscomp$15_stream$jscomp$12$$.$contents$ = new Uint8Array($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$), 0 < $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ && $node$jscomp$15_stream$jscomp$12$$.$contents$.set($oldContents$jscomp$inline_71_prevCapacity$jscomp$inline_70$$.subarray(0, $node$jscomp$15_stream$jscomp$12$$.$usedBytes$), 
  0));
  if ($node$jscomp$15_stream$jscomp$12$$.$contents$.subarray && $buffer$jscomp$30$$.subarray) {
    $node$jscomp$15_stream$jscomp$12$$.$contents$.set($buffer$jscomp$30$$.subarray($offset$jscomp$71$$, $offset$jscomp$71$$ + $length$jscomp$30$$), $position$jscomp$6$$);
  } else {
    for ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$ = 0; $canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$ < $length$jscomp$30$$; $canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$++) {
      $node$jscomp$15_stream$jscomp$12$$.$contents$[$position$jscomp$6$$ + $canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$] = $buffer$jscomp$30$$[$offset$jscomp$71$$ + $canOwn_i$jscomp$14_newCapacity$jscomp$inline_68$$];
    }
  }
  $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ = Math.max($node$jscomp$15_stream$jscomp$12$$.$usedBytes$, $position$jscomp$6$$ + $length$jscomp$30$$);
  return $length$jscomp$30$$;
}, $llseek$($stream$jscomp$13$$, $offset$jscomp$72_position$jscomp$7$$, $whence$$) {
  1 === $whence$$ ? $offset$jscomp$72_position$jscomp$7$$ += $stream$jscomp$13$$.position : 2 === $whence$$ && 32768 === ($stream$jscomp$13$$.node.mode & 61440) && ($offset$jscomp$72_position$jscomp$7$$ += $stream$jscomp$13$$.node.$usedBytes$);
  if (0 > $offset$jscomp$72_position$jscomp$7$$) {
    throw new $FS$ErrnoError$$(28);
  }
  return $offset$jscomp$72_position$jscomp$7$$;
}, $mmap$($contents$jscomp$4_stream$jscomp$14$$, $length$jscomp$31$$, $position$jscomp$8$$, $allocated_prot$$, $flags$jscomp$9_ptr$jscomp$9$$) {
  if (32768 !== ($contents$jscomp$4_stream$jscomp$14$$.node.mode & 61440)) {
    throw new $FS$ErrnoError$$(43);
  }
  $contents$jscomp$4_stream$jscomp$14$$ = $contents$jscomp$4_stream$jscomp$14$$.node.$contents$;
  if ($flags$jscomp$9_ptr$jscomp$9$$ & 2 || !$contents$jscomp$4_stream$jscomp$14$$ || $contents$jscomp$4_stream$jscomp$14$$.buffer !== $HEAP8$$.buffer) {
    $allocated_prot$$ = !0;
    $flags$jscomp$9_ptr$jscomp$9$$ = $mmapAlloc$$($length$jscomp$31$$);
    if (!$flags$jscomp$9_ptr$jscomp$9$$) {
      throw new $FS$ErrnoError$$(48);
    }
    if ($contents$jscomp$4_stream$jscomp$14$$) {
      if (0 < $position$jscomp$8$$ || $position$jscomp$8$$ + $length$jscomp$31$$ < $contents$jscomp$4_stream$jscomp$14$$.length) {
        $contents$jscomp$4_stream$jscomp$14$$.subarray ? $contents$jscomp$4_stream$jscomp$14$$ = $contents$jscomp$4_stream$jscomp$14$$.subarray($position$jscomp$8$$, $position$jscomp$8$$ + $length$jscomp$31$$) : $contents$jscomp$4_stream$jscomp$14$$ = Array.prototype.slice.call($contents$jscomp$4_stream$jscomp$14$$, $position$jscomp$8$$, $position$jscomp$8$$ + $length$jscomp$31$$);
      }
      $HEAP8$$.set($contents$jscomp$4_stream$jscomp$14$$, $flags$jscomp$9_ptr$jscomp$9$$);
    }
  } else {
    $allocated_prot$$ = !1, $flags$jscomp$9_ptr$jscomp$9$$ = $contents$jscomp$4_stream$jscomp$14$$.byteOffset;
  }
  return {$ptr$:$flags$jscomp$9_ptr$jscomp$9$$, $allocated$:$allocated_prot$$};
}, $msync$($stream$jscomp$15$$, $buffer$jscomp$31$$, $offset$jscomp$73$$, $length$jscomp$32$$) {
  $MEMFS$$.$stream_ops$.write($stream$jscomp$15$$, $buffer$jscomp$31$$, 0, $length$jscomp$32$$, $offset$jscomp$73$$, !1);
  return 0;
}}}, $FS_getMode$$ = ($canRead$$, $canWrite$$) => {
  var $mode$jscomp$29$$ = 0;
  $canRead$$ && ($mode$jscomp$29$$ |= 365);
  $canWrite$$ && ($mode$jscomp$29$$ |= 146);
  return $mode$jscomp$29$$;
}, $ERRNO_CODES$$ = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, 
EL2HLT:112, EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, 
ECONNRESET:15, ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135}, $asyncLoad$$ = async $url$jscomp$28$$ => {
  var $arrayBuffer$jscomp$1$$ = await $readAsync$$($url$jscomp$28$$);
  $assert$$($arrayBuffer$jscomp$1$$, `Loading data file "${$url$jscomp$28$$}" failed (no arrayBuffer).`);
  return new Uint8Array($arrayBuffer$jscomp$1$$);
}, $preloadPlugins$$ = [], $FS_handledByPreloadPlugin$$ = async($byteArray$jscomp$1$$, $fullname$$) => {
  "undefined" != typeof $Browser$$ && $Browser$init$$();
  for (var $plugin$$ of $preloadPlugins$$) {
    if ($plugin$$.canHandle($fullname$$)) {
      return $assert$$("AsyncFunction" === $plugin$$.handle.constructor.name, "Filesystem plugin handlers must be async functions (See #24914)"), $plugin$$.handle($byteArray$jscomp$1$$, $fullname$$);
    }
  }
  return $byteArray$jscomp$1$$;
}, $FS$root$$ = null, $FS$devices$$ = {}, $FS$streams$$ = [], $FS$nextInode$$ = 1, $FS$nameTable$$ = null, $FS$initialized$$ = !1, $FS$ignorePermissions$$ = !0, $FS$readFiles$$ = {}, $FS$ErrnoError$$ = class extends Error {
  name="ErrnoError";
  constructor($errno$jscomp$1$$) {
    super($runtimeInitialized$$ ? $UTF8ToString$$($_strerror$$($errno$jscomp$1$$)) : "");
    this.$errno$ = $errno$jscomp$1$$;
    for (var $key$jscomp$41$$ in $ERRNO_CODES$$) {
      if ($ERRNO_CODES$$[$key$jscomp$41$$] === $errno$jscomp$1$$) {
        this.code = $key$jscomp$41$$;
        break;
      }
    }
  }
}, $FS$FSStream$$ = class {
  $g$={};
  node=null;
  get object() {
    return this.node;
  }
  set object($val$jscomp$4$$) {
    this.node = $val$jscomp$4$$;
  }
  get flags() {
    return this.$g$.flags;
  }
  set flags($val$jscomp$5$$) {
    this.$g$.flags = $val$jscomp$5$$;
  }
  get position() {
    return this.$g$.position;
  }
  set position($val$jscomp$6$$) {
    this.$g$.position = $val$jscomp$6$$;
  }
}, $FS$FSNode$$ = class {
  $node_ops$={};
  $stream_ops$={};
  $mounted$=null;
  constructor($parent$jscomp$12$$, $name$jscomp$92$$, $mode$jscomp$30$$, $rdev$$) {
    $parent$jscomp$12$$ ||= this;
    this.parent = $parent$jscomp$12$$;
    this.$mount$ = $parent$jscomp$12$$.$mount$;
    this.id = $FS$nextInode$$++;
    this.name = $name$jscomp$92$$;
    this.mode = $mode$jscomp$30$$;
    this.rdev = $rdev$$;
    this.atime = this.mtime = this.ctime = Date.now();
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read($val$jscomp$7$$) {
    $val$jscomp$7$$ ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write($val$jscomp$8$$) {
    $val$jscomp$8$$ ? this.mode |= 146 : this.mode &= -147;
  }
  get $isFolder$() {
    return $FS$isDir$$(this.mode);
  }
  get $isDevice$() {
    return 8192 === (this.mode & 61440);
  }
};
function $FS$lookupPath$$($parts$jscomp$1_path$jscomp$45$$, $opts$$ = {}) {
  if (!$parts$jscomp$1_path$jscomp$45$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $opts$$.$follow_mount$ ?? ($opts$$.$follow_mount$ = !0);
  "/" === $parts$jscomp$1_path$jscomp$45$$.charAt(0) || ($parts$jscomp$1_path$jscomp$45$$ = "//" + $parts$jscomp$1_path$jscomp$45$$);
  var $nlinks$$ = 0;
  a: for (; 40 > $nlinks$$; $nlinks$$++) {
    $parts$jscomp$1_path$jscomp$45$$ = $parts$jscomp$1_path$jscomp$45$$.split("/").filter($p$jscomp$6$$ => !!$p$jscomp$6$$);
    for (var $current_link$$ = $FS$root$$, $current_path$$ = "/", $i$jscomp$15$$ = 0; $i$jscomp$15$$ < $parts$jscomp$1_path$jscomp$45$$.length; $i$jscomp$15$$++) {
      var $islast$$ = $i$jscomp$15$$ === $parts$jscomp$1_path$jscomp$45$$.length - 1;
      if ($islast$$ && $opts$$.parent) {
        break;
      }
      if ("." !== $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]) {
        if (".." === $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]) {
          if ($current_path$$ = $PATH$dirname$$($current_path$$), $current_link$$ === $current_link$$.parent) {
            $parts$jscomp$1_path$jscomp$45$$ = $current_path$$ + "/" + $parts$jscomp$1_path$jscomp$45$$.slice($i$jscomp$15$$ + 1).join("/");
            $nlinks$$--;
            continue a;
          } else {
            $current_link$$ = $current_link$$.parent;
          }
        } else {
          $current_path$$ = $PATH$normalize$$($current_path$$ + "/" + $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]);
          try {
            $current_link$$ = $FS$lookupNode$$($current_link$$, $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]);
          } catch ($e$jscomp$14$$) {
            if (44 === $e$jscomp$14$$?.$errno$ && $islast$$ && $opts$$.$noent_okay$) {
              return {path:$current_path$$};
            }
            throw $e$jscomp$14$$;
          }
          !$current_link$$.$mounted$ || $islast$$ && !$opts$$.$follow_mount$ || ($current_link$$ = $current_link$$.$mounted$.root);
          if (40960 === ($current_link$$.mode & 61440) && (!$islast$$ || $opts$$.$follow$)) {
            if (!$current_link$$.$node_ops$.readlink) {
              throw new $FS$ErrnoError$$(52);
            }
            $current_link$$ = $current_link$$.$node_ops$.readlink($current_link$$);
            "/" === $current_link$$.charAt(0) || ($current_link$$ = $PATH$dirname$$($current_path$$) + "/" + $current_link$$);
            $parts$jscomp$1_path$jscomp$45$$ = $current_link$$ + "/" + $parts$jscomp$1_path$jscomp$45$$.slice($i$jscomp$15$$ + 1).join("/");
            continue a;
          }
        }
      }
    }
    return {path:$current_path$$, node:$current_link$$};
  }
  throw new $FS$ErrnoError$$(32);
}
function $FS$getPath$$($mount$jscomp$1_node$jscomp$16$$) {
  for (var $path$jscomp$46$$;;) {
    if ($mount$jscomp$1_node$jscomp$16$$ === $mount$jscomp$1_node$jscomp$16$$.parent) {
      return $mount$jscomp$1_node$jscomp$16$$ = $mount$jscomp$1_node$jscomp$16$$.$mount$.$mountpoint$, $path$jscomp$46$$ ? "/" !== $mount$jscomp$1_node$jscomp$16$$[$mount$jscomp$1_node$jscomp$16$$.length - 1] ? `${$mount$jscomp$1_node$jscomp$16$$}/${$path$jscomp$46$$}` : $mount$jscomp$1_node$jscomp$16$$ + $path$jscomp$46$$ : $mount$jscomp$1_node$jscomp$16$$;
    }
    $path$jscomp$46$$ = $path$jscomp$46$$ ? `${$mount$jscomp$1_node$jscomp$16$$.name}/${$path$jscomp$46$$}` : $mount$jscomp$1_node$jscomp$16$$.name;
    $mount$jscomp$1_node$jscomp$16$$ = $mount$jscomp$1_node$jscomp$16$$.parent;
  }
}
function $FS$hashName$$($parentid$$, $name$jscomp$93$$) {
  for (var $hash$$ = 0, $i$jscomp$16$$ = 0; $i$jscomp$16$$ < $name$jscomp$93$$.length; $i$jscomp$16$$++) {
    $hash$$ = ($hash$$ << 5) - $hash$$ + $name$jscomp$93$$.charCodeAt($i$jscomp$16$$) | 0;
  }
  return ($parentid$$ + $hash$$ >>> 0) % $FS$nameTable$$.length;
}
function $FS$hashRemoveNode$$($node$jscomp$18$$) {
  var $current$jscomp$1_hash$jscomp$2$$ = $FS$hashName$$($node$jscomp$18$$.parent.id, $node$jscomp$18$$.name);
  if ($FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$] === $node$jscomp$18$$) {
    $FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$] = $node$jscomp$18$$.$name_next$;
  } else {
    for ($current$jscomp$1_hash$jscomp$2$$ = $FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$]; $current$jscomp$1_hash$jscomp$2$$;) {
      if ($current$jscomp$1_hash$jscomp$2$$.$name_next$ === $node$jscomp$18$$) {
        $current$jscomp$1_hash$jscomp$2$$.$name_next$ = $node$jscomp$18$$.$name_next$;
        break;
      }
      $current$jscomp$1_hash$jscomp$2$$ = $current$jscomp$1_hash$jscomp$2$$.$name_next$;
    }
  }
}
function $FS$lookupNode$$($parent$jscomp$13$$, $name$jscomp$94$$) {
  var $errCode_errCode$jscomp$inline_74_node$jscomp$19$$ = $FS$isDir$$($parent$jscomp$13$$.mode) ? ($errCode_errCode$jscomp$inline_74_node$jscomp$19$$ = $FS$nodePermissions$$($parent$jscomp$13$$, "x")) ? $errCode_errCode$jscomp$inline_74_node$jscomp$19$$ : $parent$jscomp$13$$.$node_ops$.lookup ? 0 : 2 : 54;
  if ($errCode_errCode$jscomp$inline_74_node$jscomp$19$$) {
    throw new $FS$ErrnoError$$($errCode_errCode$jscomp$inline_74_node$jscomp$19$$);
  }
  for ($errCode_errCode$jscomp$inline_74_node$jscomp$19$$ = $FS$nameTable$$[$FS$hashName$$($parent$jscomp$13$$.id, $name$jscomp$94$$)]; $errCode_errCode$jscomp$inline_74_node$jscomp$19$$; $errCode_errCode$jscomp$inline_74_node$jscomp$19$$ = $errCode_errCode$jscomp$inline_74_node$jscomp$19$$.$name_next$) {
    var $nodeName$$ = $errCode_errCode$jscomp$inline_74_node$jscomp$19$$.name;
    if ($errCode_errCode$jscomp$inline_74_node$jscomp$19$$.parent.id === $parent$jscomp$13$$.id && $nodeName$$ === $name$jscomp$94$$) {
      return $errCode_errCode$jscomp$inline_74_node$jscomp$19$$;
    }
  }
  return $parent$jscomp$13$$.$node_ops$.lookup($parent$jscomp$13$$, $name$jscomp$94$$);
}
function $FS$createNode$$($node$jscomp$20_parent$jscomp$14$$, $hash$jscomp$inline_77_name$jscomp$95$$, $mode$jscomp$31$$, $rdev$jscomp$1$$) {
  $assert$$("object" == typeof $node$jscomp$20_parent$jscomp$14$$);
  $node$jscomp$20_parent$jscomp$14$$ = new $FS$FSNode$$($node$jscomp$20_parent$jscomp$14$$, $hash$jscomp$inline_77_name$jscomp$95$$, $mode$jscomp$31$$, $rdev$jscomp$1$$);
  $hash$jscomp$inline_77_name$jscomp$95$$ = $FS$hashName$$($node$jscomp$20_parent$jscomp$14$$.parent.id, $node$jscomp$20_parent$jscomp$14$$.name);
  $node$jscomp$20_parent$jscomp$14$$.$name_next$ = $FS$nameTable$$[$hash$jscomp$inline_77_name$jscomp$95$$];
  return $FS$nameTable$$[$hash$jscomp$inline_77_name$jscomp$95$$] = $node$jscomp$20_parent$jscomp$14$$;
}
function $FS$isDir$$($mode$jscomp$33$$) {
  return 16384 === ($mode$jscomp$33$$ & 61440);
}
function $FS$flagsToPermissionString$$($flag$jscomp$3$$) {
  var $perms$$ = ["r", "w", "rw"][$flag$jscomp$3$$ & 3];
  $flag$jscomp$3$$ & 512 && ($perms$$ += "w");
  return $perms$$;
}
function $FS$nodePermissions$$($node$jscomp$24$$, $perms$jscomp$1$$) {
  if ($FS$ignorePermissions$$) {
    return 0;
  }
  if (!$perms$jscomp$1$$.includes("r") || $node$jscomp$24$$.mode & 292) {
    if ($perms$jscomp$1$$.includes("w") && !($node$jscomp$24$$.mode & 146) || $perms$jscomp$1$$.includes("x") && !($node$jscomp$24$$.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function $FS$mayCreate$$($dir$jscomp$2$$, $name$jscomp$96$$) {
  if (!$FS$isDir$$($dir$jscomp$2$$.mode)) {
    return 54;
  }
  try {
    return $FS$lookupNode$$($dir$jscomp$2$$, $name$jscomp$96$$), 20;
  } catch ($e$jscomp$15$$) {
  }
  return $FS$nodePermissions$$($dir$jscomp$2$$, "wx");
}
function $FS$checkOpExists$$($op$$) {
  if (!$op$$) {
    throw new $FS$ErrnoError$$(63);
  }
  return $op$$;
}
function $FS$getStreamChecked$$($fd$jscomp$22_stream$jscomp$16$$) {
  $fd$jscomp$22_stream$jscomp$16$$ = $FS$streams$$[$fd$jscomp$22_stream$jscomp$16$$];
  if (!$fd$jscomp$22_stream$jscomp$16$$) {
    throw new $FS$ErrnoError$$(8);
  }
  return $fd$jscomp$22_stream$jscomp$16$$;
}
function $FS$createStream$$($stream$jscomp$17$$, $fd$jscomp$24_fd$jscomp$inline_79$$ = -1) {
  $assert$$(-1 <= $fd$jscomp$24_fd$jscomp$inline_79$$);
  $stream$jscomp$17$$ = Object.assign(new $FS$FSStream$$(), $stream$jscomp$17$$);
  if (-1 == $fd$jscomp$24_fd$jscomp$inline_79$$) {
    a: {
      for ($fd$jscomp$24_fd$jscomp$inline_79$$ = 0; 4096 >= $fd$jscomp$24_fd$jscomp$inline_79$$; $fd$jscomp$24_fd$jscomp$inline_79$$++) {
        if (!$FS$streams$$[$fd$jscomp$24_fd$jscomp$inline_79$$]) {
          break a;
        }
      }
      throw new $FS$ErrnoError$$(33);
    }
  }
  $stream$jscomp$17$$.fd = $fd$jscomp$24_fd$jscomp$inline_79$$;
  return $FS$streams$$[$fd$jscomp$24_fd$jscomp$inline_79$$] = $stream$jscomp$17$$;
}
function $FS$dupStream$$($origStream_stream$jscomp$18$$, $fd$jscomp$26$$ = -1) {
  $origStream_stream$jscomp$18$$ = $FS$createStream$$($origStream_stream$jscomp$18$$, $fd$jscomp$26$$);
  $origStream_stream$jscomp$18$$.$stream_ops$?.$dup$?.($origStream_stream$jscomp$18$$);
  return $origStream_stream$jscomp$18$$;
}
function $FS$doSetAttr$$($node$jscomp$28$$, $attr$jscomp$2$$) {
  var $setattr$$ = null?.$stream_ops$.$setattr$, $arg$jscomp$8$$ = $setattr$$ ? null : $node$jscomp$28$$;
  $setattr$$ ??= $node$jscomp$28$$.$node_ops$.$setattr$;
  $FS$checkOpExists$$($setattr$$);
  $setattr$$($arg$jscomp$8$$, $attr$jscomp$2$$);
}
var $FS$chrdev_stream_ops$$ = {open($stream$jscomp$20$$) {
  $stream$jscomp$20$$.$stream_ops$ = $FS$devices$$[$stream$jscomp$20$$.node.rdev].$stream_ops$;
  $stream$jscomp$20$$.$stream_ops$.open?.($stream$jscomp$20$$);
}, $llseek$() {
  throw new $FS$ErrnoError$$(70);
}};
function $FS$registerDevice$$($dev$jscomp$5$$, $ops$jscomp$1$$) {
  $FS$devices$$[$dev$jscomp$5$$] = {$stream_ops$:$ops$jscomp$1$$};
}
function $FS$mount$$($mountRoot_type$jscomp$175$$, $mount$jscomp$4_mountpoint$$) {
  if ("string" == typeof $mountRoot_type$jscomp$175$$) {
    throw $mountRoot_type$jscomp$175$$;
  }
  var $root$jscomp$4$$ = "/" === $mount$jscomp$4_mountpoint$$, $pseudo$$ = !$mount$jscomp$4_mountpoint$$;
  if ($root$jscomp$4$$ && $FS$root$$) {
    throw new $FS$ErrnoError$$(10);
  }
  if (!$root$jscomp$4$$ && !$pseudo$$) {
    var $lookup_node$jscomp$29$$ = $FS$lookupPath$$($mount$jscomp$4_mountpoint$$, {$follow_mount$:!1});
    $mount$jscomp$4_mountpoint$$ = $lookup_node$jscomp$29$$.path;
    $lookup_node$jscomp$29$$ = $lookup_node$jscomp$29$$.node;
    if ($lookup_node$jscomp$29$$.$mounted$) {
      throw new $FS$ErrnoError$$(10);
    }
    if (!$FS$isDir$$($lookup_node$jscomp$29$$.mode)) {
      throw new $FS$ErrnoError$$(54);
    }
  }
  $mount$jscomp$4_mountpoint$$ = {type:$mountRoot_type$jscomp$175$$, $opts$:{}, $mountpoint$:$mount$jscomp$4_mountpoint$$, $mounts$:[]};
  $mountRoot_type$jscomp$175$$ = $mountRoot_type$jscomp$175$$.$mount$($mount$jscomp$4_mountpoint$$);
  $mountRoot_type$jscomp$175$$.$mount$ = $mount$jscomp$4_mountpoint$$;
  $mount$jscomp$4_mountpoint$$.root = $mountRoot_type$jscomp$175$$;
  $root$jscomp$4$$ ? $FS$root$$ = $mountRoot_type$jscomp$175$$ : $lookup_node$jscomp$29$$ && ($lookup_node$jscomp$29$$.$mounted$ = $mount$jscomp$4_mountpoint$$, $lookup_node$jscomp$29$$.$mount$ && $lookup_node$jscomp$29$$.$mount$.$mounts$.push($mount$jscomp$4_mountpoint$$));
}
function $FS$mknod$$($name$jscomp$99_path$jscomp$47$$, $mode$jscomp$39$$, $dev$jscomp$7$$) {
  var $parent$jscomp$16$$ = $FS$lookupPath$$($name$jscomp$99_path$jscomp$47$$, {parent:!0}).node;
  $name$jscomp$99_path$jscomp$47$$ = $PATH$basename$$($name$jscomp$99_path$jscomp$47$$);
  if (!$name$jscomp$99_path$jscomp$47$$) {
    throw new $FS$ErrnoError$$(28);
  }
  if ("." === $name$jscomp$99_path$jscomp$47$$ || ".." === $name$jscomp$99_path$jscomp$47$$) {
    throw new $FS$ErrnoError$$(20);
  }
  var $errCode$jscomp$5$$ = $FS$mayCreate$$($parent$jscomp$16$$, $name$jscomp$99_path$jscomp$47$$);
  if ($errCode$jscomp$5$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$5$$);
  }
  if (!$parent$jscomp$16$$.$node_ops$.$mknod$) {
    throw new $FS$ErrnoError$$(63);
  }
  return $parent$jscomp$16$$.$node_ops$.$mknod$($parent$jscomp$16$$, $name$jscomp$99_path$jscomp$47$$, $mode$jscomp$39$$, $dev$jscomp$7$$);
}
function $FS$create$$($path$jscomp$49$$, $mode$jscomp$40$$ = 438) {
  return $FS$mknod$$($path$jscomp$49$$, $mode$jscomp$40$$ & 4095 | 32768, 0);
}
function $FS$mkdir$$($path$jscomp$50$$) {
  return $FS$mknod$$($path$jscomp$50$$, 16895, 0);
}
function $FS$mkdev$$($path$jscomp$52$$, $mode$jscomp$43$$, $dev$jscomp$8$$) {
  "undefined" == typeof $dev$jscomp$8$$ && ($dev$jscomp$8$$ = $mode$jscomp$43$$, $mode$jscomp$43$$ = 438);
  return $FS$mknod$$($path$jscomp$52$$, $mode$jscomp$43$$ | 8192, $dev$jscomp$8$$);
}
function $FS$symlink$$($oldpath$jscomp$1$$, $newname$jscomp$1_newpath$$) {
  if (!$PATH_FS$resolve$$($oldpath$jscomp$1$$)) {
    throw new $FS$ErrnoError$$(44);
  }
  var $parent$jscomp$17$$ = $FS$lookupPath$$($newname$jscomp$1_newpath$$, {parent:!0}).node;
  if (!$parent$jscomp$17$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $newname$jscomp$1_newpath$$ = $PATH$basename$$($newname$jscomp$1_newpath$$);
  var $errCode$jscomp$6$$ = $FS$mayCreate$$($parent$jscomp$17$$, $newname$jscomp$1_newpath$$);
  if ($errCode$jscomp$6$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$6$$);
  }
  if (!$parent$jscomp$17$$.$node_ops$.symlink) {
    throw new $FS$ErrnoError$$(63);
  }
  $parent$jscomp$17$$.$node_ops$.symlink($parent$jscomp$17$$, $newname$jscomp$1_newpath$$, $oldpath$jscomp$1$$);
}
function $FS$unlink$$($name$jscomp$101_path$jscomp$55$$) {
  var $parent$jscomp$19$$ = $FS$lookupPath$$($name$jscomp$101_path$jscomp$55$$, {parent:!0}).node;
  if (!$parent$jscomp$19$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $name$jscomp$101_path$jscomp$55$$ = $PATH$basename$$($name$jscomp$101_path$jscomp$55$$);
  var $node$jscomp$34$$ = $FS$lookupNode$$($parent$jscomp$19$$, $name$jscomp$101_path$jscomp$55$$);
  a: {
    try {
      var $errCode$jscomp$9_node$jscomp$inline_452$$ = $FS$lookupNode$$($parent$jscomp$19$$, $name$jscomp$101_path$jscomp$55$$);
    } catch ($e$jscomp$inline_454$$) {
      $errCode$jscomp$9_node$jscomp$inline_452$$ = $e$jscomp$inline_454$$.$errno$;
      break a;
    }
    var $errCode$jscomp$inline_453$$ = $FS$nodePermissions$$($parent$jscomp$19$$, "wx");
    $errCode$jscomp$9_node$jscomp$inline_452$$ = $errCode$jscomp$inline_453$$ ? $errCode$jscomp$inline_453$$ : $FS$isDir$$($errCode$jscomp$9_node$jscomp$inline_452$$.mode) ? 31 : 0;
  }
  if ($errCode$jscomp$9_node$jscomp$inline_452$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$9_node$jscomp$inline_452$$);
  }
  if (!$parent$jscomp$19$$.$node_ops$.unlink) {
    throw new $FS$ErrnoError$$(63);
  }
  if ($node$jscomp$34$$.$mounted$) {
    throw new $FS$ErrnoError$$(10);
  }
  $parent$jscomp$19$$.$node_ops$.unlink($parent$jscomp$19$$, $name$jscomp$101_path$jscomp$55$$);
  $FS$hashRemoveNode$$($node$jscomp$34$$);
}
function $FS$stat$$($node$jscomp$35_path$jscomp$57$$, $dontFollow$$) {
  $node$jscomp$35_path$jscomp$57$$ = $FS$lookupPath$$($node$jscomp$35_path$jscomp$57$$, {$follow$:!$dontFollow$$}).node;
  return $FS$checkOpExists$$($node$jscomp$35_path$jscomp$57$$.$node_ops$.$getattr$)($node$jscomp$35_path$jscomp$57$$);
}
function $FS$chmod$$($node$jscomp$38_path$jscomp$59$$, $mode$jscomp$45$$) {
  $node$jscomp$38_path$jscomp$59$$ = "string" == typeof $node$jscomp$38_path$jscomp$59$$ ? $FS$lookupPath$$($node$jscomp$38_path$jscomp$59$$, {$follow$:!0}).node : $node$jscomp$38_path$jscomp$59$$;
  $FS$doSetAttr$$($node$jscomp$38_path$jscomp$59$$, {mode:$mode$jscomp$45$$ & 4095 | $node$jscomp$38_path$jscomp$59$$.mode & -4096, ctime:Date.now(), $dontFollow$:void 0});
}
function $FS$open$$($lookup$jscomp$14_path$jscomp$65$$, $JSCompiler_temp$jscomp$5_flags$jscomp$12$$, $mode$jscomp$48$$ = 438) {
  if ("" === $lookup$jscomp$14_path$jscomp$65$$) {
    throw new $FS$ErrnoError$$(44);
  }
  if ("string" == typeof $JSCompiler_temp$jscomp$5_flags$jscomp$12$$) {
    var $flags$jscomp$inline_89_node$jscomp$44$$ = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[$JSCompiler_temp$jscomp$5_flags$jscomp$12$$];
    if ("undefined" == typeof $flags$jscomp$inline_89_node$jscomp$44$$) {
      throw Error(`Unknown file open mode: ${$JSCompiler_temp$jscomp$5_flags$jscomp$12$$}`);
    }
    $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ = $flags$jscomp$inline_89_node$jscomp$44$$;
  }
  $mode$jscomp$48$$ = $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 64 ? $mode$jscomp$48$$ & 4095 | 32768 : 0;
  if ("object" == typeof $lookup$jscomp$14_path$jscomp$65$$) {
    $flags$jscomp$inline_89_node$jscomp$44$$ = $lookup$jscomp$14_path$jscomp$65$$;
  } else {
    var $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$ = $lookup$jscomp$14_path$jscomp$65$$.endsWith("/");
    $lookup$jscomp$14_path$jscomp$65$$ = $FS$lookupPath$$($lookup$jscomp$14_path$jscomp$65$$, {$follow$:!($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 131072), $noent_okay$:!0});
    $flags$jscomp$inline_89_node$jscomp$44$$ = $lookup$jscomp$14_path$jscomp$65$$.node;
    $lookup$jscomp$14_path$jscomp$65$$ = $lookup$jscomp$14_path$jscomp$65$$.path;
  }
  var $created$$ = !1;
  if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 64) {
    if ($flags$jscomp$inline_89_node$jscomp$44$$) {
      if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 128) {
        throw new $FS$ErrnoError$$(20);
      }
    } else {
      if ($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$) {
        throw new $FS$ErrnoError$$(31);
      }
      $flags$jscomp$inline_89_node$jscomp$44$$ = $FS$mknod$$($lookup$jscomp$14_path$jscomp$65$$, $mode$jscomp$48$$ | 511, 0);
      $created$$ = !0;
    }
  }
  if (!$flags$jscomp$inline_89_node$jscomp$44$$) {
    throw new $FS$ErrnoError$$(44);
  }
  8192 === ($flags$jscomp$inline_89_node$jscomp$44$$.mode & 61440) && ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ &= -513);
  if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 65536 && !$FS$isDir$$($flags$jscomp$inline_89_node$jscomp$44$$.mode)) {
    throw new $FS$ErrnoError$$(54);
  }
  if (!$created$$ && ($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$ = $flags$jscomp$inline_89_node$jscomp$44$$ ? 40960 === ($flags$jscomp$inline_89_node$jscomp$44$$.mode & 61440) ? 32 : $FS$isDir$$($flags$jscomp$inline_89_node$jscomp$44$$.mode) && ("r" !== $FS$flagsToPermissionString$$($JSCompiler_temp$jscomp$5_flags$jscomp$12$$) || $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 576) ? 31 : $FS$nodePermissions$$($flags$jscomp$inline_89_node$jscomp$44$$, 
  $FS$flagsToPermissionString$$($JSCompiler_temp$jscomp$5_flags$jscomp$12$$)) : 44)) {
    throw new $FS$ErrnoError$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$);
  }
  if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 512 && !$created$$) {
    $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$ = $flags$jscomp$inline_89_node$jscomp$44$$;
    $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$ = "string" == typeof $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$ ? $FS$lookupPath$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$, {$follow$:!0}).node : $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$;
    if ($FS$isDir$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$.mode)) {
      throw new $FS$ErrnoError$$(31);
    }
    if (32768 !== ($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$.mode & 61440)) {
      throw new $FS$ErrnoError$$(28);
    }
    var $errCode$jscomp$inline_458$$ = $FS$nodePermissions$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$, "w");
    if ($errCode$jscomp$inline_458$$) {
      throw new $FS$ErrnoError$$($errCode$jscomp$inline_458$$);
    }
    $FS$doSetAttr$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$, {size:0, timestamp:Date.now()});
  }
  $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ &= -131713;
  $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$ = $FS$createStream$$({node:$flags$jscomp$inline_89_node$jscomp$44$$, path:$FS$getPath$$($flags$jscomp$inline_89_node$jscomp$44$$), flags:$JSCompiler_temp$jscomp$5_flags$jscomp$12$$, seekable:!0, position:0, $stream_ops$:$flags$jscomp$inline_89_node$jscomp$44$$.$stream_ops$, $ungotten$:[], error:!1});
  $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$.$stream_ops$.open && $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$.$stream_ops$.open($errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$);
  $created$$ && $FS$chmod$$($flags$jscomp$inline_89_node$jscomp$44$$, $mode$jscomp$48$$ & 511);
  !$Module$$.logReadFiles || $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 1 || $lookup$jscomp$14_path$jscomp$65$$ in $FS$readFiles$$ || ($FS$readFiles$$[$lookup$jscomp$14_path$jscomp$65$$] = 1);
  return $errCode$jscomp$11_isDirPath_node$jscomp$inline_456_path$jscomp$inline_91_stream$jscomp$29$$;
}
function $FS$close$$($stream$jscomp$30$$) {
  if (null === $stream$jscomp$30$$.fd) {
    throw new $FS$ErrnoError$$(8);
  }
  $stream$jscomp$30$$.$getdents$ && ($stream$jscomp$30$$.$getdents$ = null);
  try {
    $stream$jscomp$30$$.$stream_ops$.close && $stream$jscomp$30$$.$stream_ops$.close($stream$jscomp$30$$);
  } catch ($e$jscomp$20$$) {
    throw $e$jscomp$20$$;
  } finally {
    $FS$streams$$[$stream$jscomp$30$$.fd] = null;
  }
  $stream$jscomp$30$$.fd = null;
}
function $FS$llseek$$($stream$jscomp$32$$, $offset$jscomp$74$$, $whence$jscomp$1$$) {
  if (null === $stream$jscomp$32$$.fd) {
    throw new $FS$ErrnoError$$(8);
  }
  if (!$stream$jscomp$32$$.seekable || !$stream$jscomp$32$$.$stream_ops$.$llseek$) {
    throw new $FS$ErrnoError$$(70);
  }
  if (0 != $whence$jscomp$1$$ && 1 != $whence$jscomp$1$$ && 2 != $whence$jscomp$1$$) {
    throw new $FS$ErrnoError$$(28);
  }
  $stream$jscomp$32$$.position = $stream$jscomp$32$$.$stream_ops$.$llseek$($stream$jscomp$32$$, $offset$jscomp$74$$, $whence$jscomp$1$$);
  $stream$jscomp$32$$.$ungotten$ = [];
}
function $FS$write$$($stream$jscomp$34$$, $buffer$jscomp$33_bytesWritten$jscomp$1$$, $offset$jscomp$76$$, $length$jscomp$34$$, $position$jscomp$10$$, $canOwn$jscomp$3$$) {
  $assert$$(0 <= $offset$jscomp$76$$);
  if (0 > $length$jscomp$34$$ || 0 > $position$jscomp$10$$) {
    throw new $FS$ErrnoError$$(28);
  }
  if (null === $stream$jscomp$34$$.fd) {
    throw new $FS$ErrnoError$$(8);
  }
  if (0 === ($stream$jscomp$34$$.flags & 2097155)) {
    throw new $FS$ErrnoError$$(8);
  }
  if ($FS$isDir$$($stream$jscomp$34$$.node.mode)) {
    throw new $FS$ErrnoError$$(31);
  }
  if (!$stream$jscomp$34$$.$stream_ops$.write) {
    throw new $FS$ErrnoError$$(28);
  }
  $stream$jscomp$34$$.seekable && $stream$jscomp$34$$.flags & 1024 && $FS$llseek$$($stream$jscomp$34$$, 0, 2);
  var $seeking$jscomp$1$$ = "undefined" != typeof $position$jscomp$10$$;
  if (!$seeking$jscomp$1$$) {
    $position$jscomp$10$$ = $stream$jscomp$34$$.position;
  } else if (!$stream$jscomp$34$$.seekable) {
    throw new $FS$ErrnoError$$(70);
  }
  $buffer$jscomp$33_bytesWritten$jscomp$1$$ = $stream$jscomp$34$$.$stream_ops$.write($stream$jscomp$34$$, $buffer$jscomp$33_bytesWritten$jscomp$1$$, $offset$jscomp$76$$, $length$jscomp$34$$, $position$jscomp$10$$, $canOwn$jscomp$3$$);
  $seeking$jscomp$1$$ || ($stream$jscomp$34$$.position += $buffer$jscomp$33_bytesWritten$jscomp$1$$);
  return $buffer$jscomp$33_bytesWritten$jscomp$1$$;
}
function $FS$createPath$$($parent$jscomp$21$$, $parts$jscomp$2_path$jscomp$71$$) {
  $parent$jscomp$21$$ = "string" == typeof $parent$jscomp$21$$ ? $parent$jscomp$21$$ : $FS$getPath$$($parent$jscomp$21$$);
  for ($parts$jscomp$2_path$jscomp$71$$ = $parts$jscomp$2_path$jscomp$71$$.split("/").reverse(); $parts$jscomp$2_path$jscomp$71$$.length;) {
    var $part$$ = $parts$jscomp$2_path$jscomp$71$$.pop();
    if ($part$$) {
      var $current$jscomp$3$$ = $PATH$normalize$$($parent$jscomp$21$$ + "/" + $part$$);
      try {
        $FS$mkdir$$($current$jscomp$3$$);
      } catch ($e$jscomp$23$$) {
        if (20 != $e$jscomp$23$$.$errno$) {
          throw $e$jscomp$23$$;
        }
      }
      $parent$jscomp$21$$ = $current$jscomp$3$$;
    }
  }
  return $current$jscomp$3$$;
}
function $FS$createFile$$($parent$jscomp$22_path$jscomp$72$$, $name$jscomp$103$$, $canRead$jscomp$4$$, $canWrite$jscomp$4$$) {
  $parent$jscomp$22_path$jscomp$72$$ = $PATH$normalize$$(("string" == typeof $parent$jscomp$22_path$jscomp$72$$ ? $parent$jscomp$22_path$jscomp$72$$ : $FS$getPath$$($parent$jscomp$22_path$jscomp$72$$)) + "/" + $name$jscomp$103$$);
  return $FS$create$$($parent$jscomp$22_path$jscomp$72$$, $FS_getMode$$($canRead$jscomp$4$$, $canWrite$jscomp$4$$));
}
function $FS$createDataFile$$($mode$jscomp$50_parent$jscomp$23$$, $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$, $data$jscomp$94$$, $canRead$jscomp$5_i$jscomp$17$$, $canWrite$jscomp$5_len$jscomp$8$$, $canOwn$jscomp$4$$) {
  var $node$jscomp$46_path$jscomp$73$$ = $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$;
  $mode$jscomp$50_parent$jscomp$23$$ && ($mode$jscomp$50_parent$jscomp$23$$ = "string" == typeof $mode$jscomp$50_parent$jscomp$23$$ ? $mode$jscomp$50_parent$jscomp$23$$ : $FS$getPath$$($mode$jscomp$50_parent$jscomp$23$$), $node$jscomp$46_path$jscomp$73$$ = $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$ ? $PATH$normalize$$($mode$jscomp$50_parent$jscomp$23$$ + "/" + $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$) : $mode$jscomp$50_parent$jscomp$23$$);
  $mode$jscomp$50_parent$jscomp$23$$ = $FS_getMode$$($canRead$jscomp$5_i$jscomp$17$$, $canWrite$jscomp$5_len$jscomp$8$$);
  $node$jscomp$46_path$jscomp$73$$ = $FS$create$$($node$jscomp$46_path$jscomp$73$$, $mode$jscomp$50_parent$jscomp$23$$);
  if ($data$jscomp$94$$) {
    if ("string" == typeof $data$jscomp$94$$) {
      $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$ = Array($data$jscomp$94$$.length);
      $canRead$jscomp$5_i$jscomp$17$$ = 0;
      for ($canWrite$jscomp$5_len$jscomp$8$$ = $data$jscomp$94$$.length; $canRead$jscomp$5_i$jscomp$17$$ < $canWrite$jscomp$5_len$jscomp$8$$; ++$canRead$jscomp$5_i$jscomp$17$$) {
        $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$[$canRead$jscomp$5_i$jscomp$17$$] = $data$jscomp$94$$.charCodeAt($canRead$jscomp$5_i$jscomp$17$$);
      }
      $data$jscomp$94$$ = $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$;
    }
    $FS$chmod$$($node$jscomp$46_path$jscomp$73$$, $mode$jscomp$50_parent$jscomp$23$$ | 146);
    $arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$ = $FS$open$$($node$jscomp$46_path$jscomp$73$$, 577);
    $FS$write$$($arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$, $data$jscomp$94$$, 0, $data$jscomp$94$$.length, 0, $canOwn$jscomp$4$$);
    $FS$close$$($arr$jscomp$2_name$jscomp$104_stream$jscomp$43$$);
    $FS$chmod$$($node$jscomp$46_path$jscomp$73$$, $mode$jscomp$50_parent$jscomp$23$$);
  }
}
function $FS$createDevice$$($parent$jscomp$24_path$jscomp$74$$, $mode$jscomp$51_name$jscomp$105$$, $input$jscomp$14$$, $output$jscomp$4$$) {
  $parent$jscomp$24_path$jscomp$74$$ = $PATH$normalize$$(("string" == typeof $parent$jscomp$24_path$jscomp$74$$ ? $parent$jscomp$24_path$jscomp$74$$ : $FS$getPath$$($parent$jscomp$24_path$jscomp$74$$)) + "/" + $mode$jscomp$51_name$jscomp$105$$);
  $mode$jscomp$51_name$jscomp$105$$ = $FS_getMode$$(!!$input$jscomp$14$$, !!$output$jscomp$4$$);
  $FS$createDevice$$.$major$ ?? ($FS$createDevice$$.$major$ = 64);
  var $dev$jscomp$9$$ = $FS$createDevice$$.$major$++ << 8 | 0;
  $FS$registerDevice$$($dev$jscomp$9$$, {open($stream$jscomp$44$$) {
    $stream$jscomp$44$$.seekable = !1;
  }, close() {
    $output$jscomp$4$$?.buffer?.length && $output$jscomp$4$$(10);
  }, read($stream$jscomp$46$$, $buffer$jscomp$36$$, $offset$jscomp$79$$, $length$jscomp$39$$) {
    for (var $bytesRead$jscomp$3$$ = 0, $i$jscomp$18$$ = 0; $i$jscomp$18$$ < $length$jscomp$39$$; $i$jscomp$18$$++) {
      try {
        var $result$jscomp$6$$ = $input$jscomp$14$$();
      } catch ($e$jscomp$24$$) {
        throw new $FS$ErrnoError$$(29);
      }
      if (void 0 === $result$jscomp$6$$ && 0 === $bytesRead$jscomp$3$$) {
        throw new $FS$ErrnoError$$(6);
      }
      if (null === $result$jscomp$6$$ || void 0 === $result$jscomp$6$$) {
        break;
      }
      $bytesRead$jscomp$3$$++;
      $buffer$jscomp$36$$[$offset$jscomp$79$$ + $i$jscomp$18$$] = $result$jscomp$6$$;
    }
    $bytesRead$jscomp$3$$ && ($stream$jscomp$46$$.node.atime = Date.now());
    return $bytesRead$jscomp$3$$;
  }, write($stream$jscomp$47$$, $buffer$jscomp$37$$, $offset$jscomp$80$$, $length$jscomp$40$$) {
    for (var $i$jscomp$19$$ = 0; $i$jscomp$19$$ < $length$jscomp$40$$; $i$jscomp$19$$++) {
      try {
        $output$jscomp$4$$($buffer$jscomp$37$$[$offset$jscomp$80$$ + $i$jscomp$19$$]);
      } catch ($e$jscomp$25$$) {
        throw new $FS$ErrnoError$$(29);
      }
    }
    $length$jscomp$40$$ && ($stream$jscomp$47$$.node.mtime = $stream$jscomp$47$$.node.ctime = Date.now());
    return $i$jscomp$19$$;
  }});
  return $FS$mkdev$$($parent$jscomp$24_path$jscomp$74$$, $mode$jscomp$51_name$jscomp$105$$, $dev$jscomp$9$$);
}
function $FS$forceLoadFile$$($obj$jscomp$33$$) {
  if (!($obj$jscomp$33$$.$isDevice$ || $obj$jscomp$33$$.$isFolder$ || $obj$jscomp$33$$.link || $obj$jscomp$33$$.$contents$)) {
    if ("undefined" != typeof XMLHttpRequest) {
      throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    }
    try {
      $obj$jscomp$33$$.$contents$ = $readBinary$$($obj$jscomp$33$$.url);
    } catch ($e$jscomp$26$$) {
      throw new $FS$ErrnoError$$(29);
    }
  }
}
function $FS$createLazyFile$$($parent$jscomp$25$$, $name$jscomp$106$$, $url$jscomp$31$$, $canRead$jscomp$6$$, $canWrite$jscomp$6$$) {
  function $writeChunks$$($contents$jscomp$5_stream$jscomp$48$$, $buffer$jscomp$38$$, $offset$jscomp$81$$, $length$jscomp$41_size$jscomp$27$$, $position$jscomp$12$$) {
    $contents$jscomp$5_stream$jscomp$48$$ = $contents$jscomp$5_stream$jscomp$48$$.node.$contents$;
    if ($position$jscomp$12$$ >= $contents$jscomp$5_stream$jscomp$48$$.length) {
      return 0;
    }
    $length$jscomp$41_size$jscomp$27$$ = Math.min($contents$jscomp$5_stream$jscomp$48$$.length - $position$jscomp$12$$, $length$jscomp$41_size$jscomp$27$$);
    $assert$$(0 <= $length$jscomp$41_size$jscomp$27$$);
    if ($contents$jscomp$5_stream$jscomp$48$$.slice) {
      for (var $i$jscomp$20$$ = 0; $i$jscomp$20$$ < $length$jscomp$41_size$jscomp$27$$; $i$jscomp$20$$++) {
        $buffer$jscomp$38$$[$offset$jscomp$81$$ + $i$jscomp$20$$] = $contents$jscomp$5_stream$jscomp$48$$[$position$jscomp$12$$ + $i$jscomp$20$$];
      }
    } else {
      for ($i$jscomp$20$$ = 0; $i$jscomp$20$$ < $length$jscomp$41_size$jscomp$27$$; $i$jscomp$20$$++) {
        $buffer$jscomp$38$$[$offset$jscomp$81$$ + $i$jscomp$20$$] = $contents$jscomp$5_stream$jscomp$48$$.get($position$jscomp$12$$ + $i$jscomp$20$$);
      }
    }
    return $length$jscomp$41_size$jscomp$27$$;
  }
  class $LazyUint8Array$$ {
    $j$=!1;
    $g$=[];
    $i$=void 0;
    $m$=0;
    $l$=0;
    get($idx$jscomp$3$$) {
      if (!($idx$jscomp$3$$ > this.length - 1 || 0 > $idx$jscomp$3$$)) {
        var $chunkOffset$$ = $idx$jscomp$3$$ % this.chunkSize;
        return this.$i$($idx$jscomp$3$$ / this.chunkSize | 0)[$chunkOffset$$];
      }
    }
    $s$($getter$$) {
      this.$i$ = $getter$$;
    }
    $o$() {
      var $usesGzip_xhr$jscomp$2$$ = new XMLHttpRequest();
      $usesGzip_xhr$jscomp$2$$.open("HEAD", $url$jscomp$31$$, !1);
      $usesGzip_xhr$jscomp$2$$.send(null);
      if (!(200 <= $usesGzip_xhr$jscomp$2$$.status && 300 > $usesGzip_xhr$jscomp$2$$.status || 304 === $usesGzip_xhr$jscomp$2$$.status)) {
        throw Error("Couldn't load " + $url$jscomp$31$$ + ". Status: " + $usesGzip_xhr$jscomp$2$$.status);
      }
      var $datalength$$ = Number($usesGzip_xhr$jscomp$2$$.getResponseHeader("Content-length")), $header$jscomp$2$$, $hasByteServing$$ = ($header$jscomp$2$$ = $usesGzip_xhr$jscomp$2$$.getResponseHeader("Accept-Ranges")) && "bytes" === $header$jscomp$2$$;
      $usesGzip_xhr$jscomp$2$$ = ($header$jscomp$2$$ = $usesGzip_xhr$jscomp$2$$.getResponseHeader("Content-Encoding")) && "gzip" === $header$jscomp$2$$;
      var $chunkSize$$ = 1048576;
      $hasByteServing$$ || ($chunkSize$$ = $datalength$$);
      var $lazyArray$jscomp$1$$ = this;
      $lazyArray$jscomp$1$$.$s$($chunkNum$jscomp$1$$ => {
        var $JSCompiler_inline_result$jscomp$12_start$jscomp$22$$ = $chunkNum$jscomp$1$$ * $chunkSize$$, $end$jscomp$21_to$jscomp$inline_105$$ = ($chunkNum$jscomp$1$$ + 1) * $chunkSize$$ - 1;
        $end$jscomp$21_to$jscomp$inline_105$$ = Math.min($end$jscomp$21_to$jscomp$inline_105$$, $datalength$$ - 1);
        if ("undefined" == typeof $lazyArray$jscomp$1$$.$g$[$chunkNum$jscomp$1$$]) {
          var $JSCompiler_temp_const$jscomp$11$$ = $lazyArray$jscomp$1$$.$g$;
          if ($JSCompiler_inline_result$jscomp$12_start$jscomp$22$$ > $end$jscomp$21_to$jscomp$inline_105$$) {
            throw Error("invalid range (" + $JSCompiler_inline_result$jscomp$12_start$jscomp$22$$ + ", " + $end$jscomp$21_to$jscomp$inline_105$$ + ") or no bytes requested!");
          }
          if ($end$jscomp$21_to$jscomp$inline_105$$ > $datalength$$ - 1) {
            throw Error("only " + $datalength$$ + " bytes available! programmer error!");
          }
          var $xhr$jscomp$inline_106$$ = new XMLHttpRequest();
          $xhr$jscomp$inline_106$$.open("GET", $url$jscomp$31$$, !1);
          $datalength$$ !== $chunkSize$$ && $xhr$jscomp$inline_106$$.setRequestHeader("Range", "bytes=" + $JSCompiler_inline_result$jscomp$12_start$jscomp$22$$ + "-" + $end$jscomp$21_to$jscomp$inline_105$$);
          $xhr$jscomp$inline_106$$.responseType = "arraybuffer";
          $xhr$jscomp$inline_106$$.overrideMimeType && $xhr$jscomp$inline_106$$.overrideMimeType("text/plain; charset=x-user-defined");
          $xhr$jscomp$inline_106$$.send(null);
          if (!(200 <= $xhr$jscomp$inline_106$$.status && 300 > $xhr$jscomp$inline_106$$.status || 304 === $xhr$jscomp$inline_106$$.status)) {
            throw Error("Couldn't load " + $url$jscomp$31$$ + ". Status: " + $xhr$jscomp$inline_106$$.status);
          }
          $JSCompiler_inline_result$jscomp$12_start$jscomp$22$$ = void 0 !== $xhr$jscomp$inline_106$$.response ? new Uint8Array($xhr$jscomp$inline_106$$.response || []) : $intArrayFromString$$($xhr$jscomp$inline_106$$.responseText || "");
          $JSCompiler_temp_const$jscomp$11$$[$chunkNum$jscomp$1$$] = $JSCompiler_inline_result$jscomp$12_start$jscomp$22$$;
        }
        if ("undefined" == typeof $lazyArray$jscomp$1$$.$g$[$chunkNum$jscomp$1$$]) {
          throw Error("doXHR failed!");
        }
        return $lazyArray$jscomp$1$$.$g$[$chunkNum$jscomp$1$$];
      });
      if ($usesGzip_xhr$jscomp$2$$ || !$datalength$$) {
        $chunkSize$$ = $datalength$$ = 1, $chunkSize$$ = $datalength$$ = this.$i$(0).length, $out$$("LazyFiles on gzip forces download of the whole file when length is accessed");
      }
      this.$m$ = $datalength$$;
      this.$l$ = $chunkSize$$;
      this.$j$ = !0;
    }
    get length() {
      this.$j$ || this.$o$();
      return this.$m$;
    }
    get chunkSize() {
      this.$j$ || this.$o$();
      return this.$l$;
    }
  }
  if ("undefined" != typeof XMLHttpRequest) {
    if (!$ENVIRONMENT_IS_WORKER$$) {
      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
    }
    var $JSCompiler_object_inline_contents_438$$ = new $LazyUint8Array$$();
    var $JSCompiler_object_inline_url_439$$ = void 0;
  } else {
    $JSCompiler_object_inline_url_439$$ = $url$jscomp$31$$, $JSCompiler_object_inline_contents_438$$ = void 0;
  }
  var $node$jscomp$47$$ = $FS$createFile$$($parent$jscomp$25$$, $name$jscomp$106$$, $canRead$jscomp$6$$, $canWrite$jscomp$6$$);
  $JSCompiler_object_inline_contents_438$$ ? $node$jscomp$47$$.$contents$ = $JSCompiler_object_inline_contents_438$$ : $JSCompiler_object_inline_url_439$$ && ($node$jscomp$47$$.$contents$ = null, $node$jscomp$47$$.url = $JSCompiler_object_inline_url_439$$);
  Object.defineProperties($node$jscomp$47$$, {$usedBytes$:{get:function() {
    return this.$contents$.length;
  }}});
  var $stream_ops$$ = {};
  Object.keys($node$jscomp$47$$.$stream_ops$).forEach($key$jscomp$42$$ => {
    var $fn$jscomp$1$$ = $node$jscomp$47$$.$stream_ops$[$key$jscomp$42$$];
    $stream_ops$$[$key$jscomp$42$$] = (...$args$jscomp$11$$) => {
      $FS$forceLoadFile$$($node$jscomp$47$$);
      return $fn$jscomp$1$$(...$args$jscomp$11$$);
    };
  });
  $stream_ops$$.read = ($stream$jscomp$49$$, $buffer$jscomp$39$$, $offset$jscomp$82$$, $length$jscomp$42$$, $position$jscomp$13$$) => {
    $FS$forceLoadFile$$($node$jscomp$47$$);
    return $writeChunks$$($stream$jscomp$49$$, $buffer$jscomp$39$$, $offset$jscomp$82$$, $length$jscomp$42$$, $position$jscomp$13$$);
  };
  $stream_ops$$.$mmap$ = ($stream$jscomp$50$$, $length$jscomp$43$$, $position$jscomp$14$$) => {
    $FS$forceLoadFile$$($node$jscomp$47$$);
    var $ptr$jscomp$10$$ = $mmapAlloc$$($length$jscomp$43$$);
    if (!$ptr$jscomp$10$$) {
      throw new $FS$ErrnoError$$(48);
    }
    $writeChunks$$($stream$jscomp$50$$, $HEAP8$$, $ptr$jscomp$10$$, $length$jscomp$43$$, $position$jscomp$14$$);
    return {$ptr$:$ptr$jscomp$10$$, $allocated$:!0};
  };
  $node$jscomp$47$$.$stream_ops$ = $stream_ops$$;
  return $node$jscomp$47$$;
}
var $FS$$ = {};
function $SYSCALLS$calculateAt$$($dir$jscomp$5_dirfd$$, $path$jscomp$75$$, $allowEmpty$$) {
  if ("/" === $path$jscomp$75$$.charAt(0)) {
    return $path$jscomp$75$$;
  }
  $dir$jscomp$5_dirfd$$ = -100 === $dir$jscomp$5_dirfd$$ ? "/" : $FS$getStreamChecked$$($dir$jscomp$5_dirfd$$).path;
  if (0 == $path$jscomp$75$$.length) {
    if (!$allowEmpty$$) {
      throw new $FS$ErrnoError$$(44);
    }
    return $dir$jscomp$5_dirfd$$;
  }
  return $dir$jscomp$5_dirfd$$ + "/" + $path$jscomp$75$$;
}
function $SYSCALLS$writeStat$$($buf$jscomp$10$$, $stat$jscomp$1$$) {
  $HEAPU32$$[$buf$jscomp$10$$ >> 2] = $stat$jscomp$1$$.dev;
  $HEAPU32$$[$buf$jscomp$10$$ + 4 >> 2] = $stat$jscomp$1$$.mode;
  $HEAPU32$$[$buf$jscomp$10$$ + 8 >> 2] = $stat$jscomp$1$$.nlink;
  $HEAPU32$$[$buf$jscomp$10$$ + 12 >> 2] = $stat$jscomp$1$$.uid;
  $HEAPU32$$[$buf$jscomp$10$$ + 16 >> 2] = $stat$jscomp$1$$.gid;
  $HEAPU32$$[$buf$jscomp$10$$ + 20 >> 2] = $stat$jscomp$1$$.rdev;
  $HEAP64$$[$buf$jscomp$10$$ + 24 >> 3] = BigInt($stat$jscomp$1$$.size);
  $HEAP32$$[$buf$jscomp$10$$ + 32 >> 2] = 4096;
  $HEAP32$$[$buf$jscomp$10$$ + 36 >> 2] = $stat$jscomp$1$$.blocks;
  var $atime$jscomp$5$$ = $stat$jscomp$1$$.atime.getTime(), $mtime$jscomp$5$$ = $stat$jscomp$1$$.mtime.getTime(), $ctime$$ = $stat$jscomp$1$$.ctime.getTime();
  $HEAP64$$[$buf$jscomp$10$$ + 40 >> 3] = BigInt(Math.floor($atime$jscomp$5$$ / 1000));
  $HEAPU32$$[$buf$jscomp$10$$ + 48 >> 2] = $atime$jscomp$5$$ % 1000 * 1E6;
  $HEAP64$$[$buf$jscomp$10$$ + 56 >> 3] = BigInt(Math.floor($mtime$jscomp$5$$ / 1000));
  $HEAPU32$$[$buf$jscomp$10$$ + 64 >> 2] = $mtime$jscomp$5$$ % 1000 * 1E6;
  $HEAP64$$[$buf$jscomp$10$$ + 72 >> 3] = BigInt(Math.floor($ctime$$ / 1000));
  $HEAPU32$$[$buf$jscomp$10$$ + 80 >> 2] = $ctime$$ % 1000 * 1E6;
  $HEAP64$$[$buf$jscomp$10$$ + 88 >> 3] = BigInt($stat$jscomp$1$$.ino);
  return 0;
}
var $SYSCALLS$varargs$$ = void 0, $AsciiToString$$ = $ptr$jscomp$12$$ => {
  for (var $str$jscomp$13$$ = "";;) {
    var $ch$jscomp$1$$ = $HEAPU8$$[$ptr$jscomp$12$$++];
    if (!$ch$jscomp$1$$) {
      return $str$jscomp$13$$;
    }
    $str$jscomp$13$$ += String.fromCharCode($ch$jscomp$1$$);
  }
}, $awaitingDependencies$$ = {}, $registeredTypes$$ = {}, $typeDependencies$$ = {}, $BindingError$$ = class extends Error {
  constructor($message$jscomp$42$$) {
    super($message$jscomp$42$$);
    this.name = "BindingError";
  }
};
function $sharedRegisterType$$($rawType$$, $callbacks$jscomp$1_registeredInstance$$, $options$jscomp$107$$ = {}) {
  var $name$jscomp$107$$ = $callbacks$jscomp$1_registeredInstance$$.name;
  if (!$rawType$$) {
    throw new $BindingError$$(`type "${$name$jscomp$107$$}" must have a positive integer typeid pointer`);
  }
  if ($registeredTypes$$.hasOwnProperty($rawType$$)) {
    if ($options$jscomp$107$$.$ignoreDuplicateRegistrations$) {
      return;
    }
    throw new $BindingError$$(`Cannot register type '${$name$jscomp$107$$}' twice`);
  }
  $registeredTypes$$[$rawType$$] = $callbacks$jscomp$1_registeredInstance$$;
  delete $typeDependencies$$[$rawType$$];
  $awaitingDependencies$$.hasOwnProperty($rawType$$) && ($callbacks$jscomp$1_registeredInstance$$ = $awaitingDependencies$$[$rawType$$], delete $awaitingDependencies$$[$rawType$$], $callbacks$jscomp$1_registeredInstance$$.forEach($cb$jscomp$8$$ => $cb$jscomp$8$$()));
}
function $registerType$$($rawType$jscomp$1$$, $registeredInstance$jscomp$1$$, $options$jscomp$108$$ = {}) {
  return $sharedRegisterType$$($rawType$jscomp$1$$, $registeredInstance$jscomp$1$$, $options$jscomp$108$$);
}
var $integerReadValueFromPointer$$ = ($name$jscomp$108$$, $width$jscomp$28$$, $signed$$) => {
  switch($width$jscomp$28$$) {
    case 1:
      return $signed$$ ? $pointer$$ => $HEAP8$$[$pointer$$] : $pointer$jscomp$1$$ => $HEAPU8$$[$pointer$jscomp$1$$];
    case 2:
      return $signed$$ ? $pointer$jscomp$2$$ => $HEAP16$$[$pointer$jscomp$2$$ >> 1] : $pointer$jscomp$3$$ => $HEAPU16$$[$pointer$jscomp$3$$ >> 1];
    case 4:
      return $signed$$ ? $pointer$jscomp$4$$ => $HEAP32$$[$pointer$jscomp$4$$ >> 2] : $pointer$jscomp$5$$ => $HEAPU32$$[$pointer$jscomp$5$$ >> 2];
    case 8:
      return $signed$$ ? $pointer$jscomp$6$$ => $HEAP64$$[$pointer$jscomp$6$$ >> 3] : $pointer$jscomp$7$$ => $HEAPU64$$[$pointer$jscomp$7$$ >> 3];
    default:
      throw new TypeError(`invalid integer width (${$width$jscomp$28$$}): ${$name$jscomp$108$$}`);
  }
}, $embindRepr$$ = $v$jscomp$3$$ => {
  if (null === $v$jscomp$3$$) {
    return "null";
  }
  var $t$$ = typeof $v$jscomp$3$$;
  return "object" === $t$$ || "array" === $t$$ || "function" === $t$$ ? $v$jscomp$3$$.toString() : "" + $v$jscomp$3$$;
}, $assertIntegerRange$$ = ($typeName$$, $value$jscomp$112$$, $minRange$$, $maxRange$$) => {
  if ($value$jscomp$112$$ < $minRange$$ || $value$jscomp$112$$ > $maxRange$$) {
    throw new TypeError(`Passing a number "${$embindRepr$$($value$jscomp$112$$)}" from JS side to C/C++ side to an argument of type "${$typeName$$}", which is outside the valid range [${$minRange$$}, ${$maxRange$$}]!`);
  }
}, $emval_freelist$$ = [], $emval_handles$$ = [0, 1, , 1, null, 1, !0, 1, !1, 1], $Emval$toHandle$$ = $value$jscomp$116$$ => {
  switch($value$jscomp$116$$) {
    case void 0:
      return 2;
    case null:
      return 4;
    case !0:
      return 6;
    case !1:
      return 8;
    default:
      const $handle$jscomp$14$$ = $emval_freelist$$.pop() || $emval_handles$$.length;
      $emval_handles$$[$handle$jscomp$14$$] = $value$jscomp$116$$;
      $emval_handles$$[$handle$jscomp$14$$ + 1] = 1;
      return $handle$jscomp$14$$;
  }
};
function $readPointer$$($pointer$jscomp$9$$) {
  return this.$fromWireType$($HEAPU32$$[$pointer$jscomp$9$$ >> 2]);
}
var $EmValType$$ = {name:"emscripten::val", $fromWireType$:$handle$jscomp$15$$ => {
  if (!$handle$jscomp$15$$) {
    throw new $BindingError$$(`Cannot use deleted val. handle = ${$handle$jscomp$15$$}`);
  }
  $assert$$(2 === $handle$jscomp$15$$ || void 0 !== $emval_handles$$[$handle$jscomp$15$$] && 0 === $handle$jscomp$15$$ % 2, `invalid handle: ${$handle$jscomp$15$$}`);
  var $rv$$ = $emval_handles$$[$handle$jscomp$15$$];
  9 < $handle$jscomp$15$$ && 0 === --$emval_handles$$[$handle$jscomp$15$$ + 1] && ($assert$$(void 0 !== $emval_handles$$[$handle$jscomp$15$$], "Decref for unallocated handle."), $emval_handles$$[$handle$jscomp$15$$] = void 0, $emval_freelist$$.push($handle$jscomp$15$$));
  return $rv$$;
}, $toWireType$:($destructors$jscomp$2$$, $value$jscomp$117$$) => $Emval$toHandle$$($value$jscomp$117$$), $readValueFromPointer$:$readPointer$$, $destructorFunction$:null}, $floatReadValueFromPointer$$ = ($name$jscomp$111$$, $width$jscomp$29$$) => {
  switch($width$jscomp$29$$) {
    case 4:
      return function($pointer$jscomp$10$$) {
        return this.$fromWireType$($HEAPF32$$[$pointer$jscomp$10$$ >> 2]);
      };
    case 8:
      return function($pointer$jscomp$11$$) {
        return this.$fromWireType$($HEAPF64$$[$pointer$jscomp$11$$ >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${$width$jscomp$29$$}): ${$name$jscomp$111$$}`);
  }
}, $stringToUTF8$$ = ($str$jscomp$14$$, $outPtr$$, $maxBytesToWrite$jscomp$1$$) => {
  $assert$$("number" == typeof $maxBytesToWrite$jscomp$1$$, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return $stringToUTF8Array$$($str$jscomp$14$$, $HEAPU8$$, $outPtr$$, $maxBytesToWrite$jscomp$1$$);
}, $UTF16Decoder$$ = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, $UTF16ToString$$ = ($i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$, $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$, $ignoreNul$jscomp$3_str$jscomp$16$$) => {
  $assert$$(0 == $i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$ % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  $i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$ >>= 1;
  $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$ = $findStringEnd$$($HEAPU16$$, $i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$, $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$ / 2, $ignoreNul$jscomp$3_str$jscomp$16$$);
  if (16 < $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$ - $i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$ && $UTF16Decoder$$) {
    return $UTF16Decoder$$.decode($HEAPU16$$.subarray($i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$, $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$));
  }
  for ($ignoreNul$jscomp$3_str$jscomp$16$$ = ""; $i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$ < $endIdx$jscomp$1_maxBytesToRead$jscomp$3$$; ++$i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$) {
    $ignoreNul$jscomp$3_str$jscomp$16$$ += String.fromCharCode($HEAPU16$$[$i$jscomp$24_idx$jscomp$4_ptr$jscomp$15$$]);
  }
  return $ignoreNul$jscomp$3_str$jscomp$16$$;
}, $stringToUTF16$$ = ($str$jscomp$17$$, $outPtr$jscomp$1$$, $maxBytesToWrite$jscomp$2_numCharsToWrite$$) => {
  $assert$$(0 == $outPtr$jscomp$1$$ % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  $assert$$("number" == typeof $maxBytesToWrite$jscomp$2_numCharsToWrite$$, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  $maxBytesToWrite$jscomp$2_numCharsToWrite$$ ??= 2147483647;
  if (2 > $maxBytesToWrite$jscomp$2_numCharsToWrite$$) {
    return 0;
  }
  $maxBytesToWrite$jscomp$2_numCharsToWrite$$ -= 2;
  var $startPtr$$ = $outPtr$jscomp$1$$;
  $maxBytesToWrite$jscomp$2_numCharsToWrite$$ = $maxBytesToWrite$jscomp$2_numCharsToWrite$$ < 2 * $str$jscomp$17$$.length ? $maxBytesToWrite$jscomp$2_numCharsToWrite$$ / 2 : $str$jscomp$17$$.length;
  for (var $i$jscomp$25$$ = 0; $i$jscomp$25$$ < $maxBytesToWrite$jscomp$2_numCharsToWrite$$; ++$i$jscomp$25$$) {
    $HEAP16$$[$outPtr$jscomp$1$$ >> 1] = $str$jscomp$17$$.charCodeAt($i$jscomp$25$$), $outPtr$jscomp$1$$ += 2;
  }
  $HEAP16$$[$outPtr$jscomp$1$$ >> 1] = 0;
  return $outPtr$jscomp$1$$ - $startPtr$$;
}, $lengthBytesUTF16$$ = $str$jscomp$18$$ => 2 * $str$jscomp$18$$.length, $UTF32ToString$$ = ($ptr$jscomp$16_startIdx$jscomp$1$$, $maxBytesToRead$jscomp$4$$, $ignoreNul$jscomp$4$$) => {
  $assert$$(0 == $ptr$jscomp$16_startIdx$jscomp$1$$ % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  var $str$jscomp$19$$ = "";
  $ptr$jscomp$16_startIdx$jscomp$1$$ >>= 2;
  for (var $i$jscomp$26$$ = 0; !($i$jscomp$26$$ >= $maxBytesToRead$jscomp$4$$ / 4); $i$jscomp$26$$++) {
    var $utf32$$ = $HEAPU32$$[$ptr$jscomp$16_startIdx$jscomp$1$$ + $i$jscomp$26$$];
    if (!$utf32$$ && !$ignoreNul$jscomp$4$$) {
      break;
    }
    $str$jscomp$19$$ += String.fromCodePoint($utf32$$);
  }
  return $str$jscomp$19$$;
}, $stringToUTF32$$ = ($str$jscomp$20$$, $outPtr$jscomp$2$$, $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$) => {
  $assert$$(0 == $outPtr$jscomp$2$$ % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  $assert$$("number" == typeof $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$ ??= 2147483647;
  if (4 > $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$) {
    return 0;
  }
  var $startPtr$jscomp$1$$ = $outPtr$jscomp$2$$;
  $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$ = $startPtr$jscomp$1$$ + $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$ - 4;
  for (var $i$jscomp$27$$ = 0; $i$jscomp$27$$ < $str$jscomp$20$$.length; ++$i$jscomp$27$$) {
    var $codePoint$jscomp$1$$ = $str$jscomp$20$$.codePointAt($i$jscomp$27$$);
    65535 < $codePoint$jscomp$1$$ && $i$jscomp$27$$++;
    $HEAP32$$[$outPtr$jscomp$2$$ >> 2] = $codePoint$jscomp$1$$;
    $outPtr$jscomp$2$$ += 4;
    if ($outPtr$jscomp$2$$ + 4 > $endPtr$jscomp$1_maxBytesToWrite$jscomp$3$$) {
      break;
    }
  }
  $HEAP32$$[$outPtr$jscomp$2$$ >> 2] = 0;
  return $outPtr$jscomp$2$$ - $startPtr$jscomp$1$$;
}, $lengthBytesUTF32$$ = $str$jscomp$21$$ => {
  for (var $len$jscomp$10$$ = 0, $i$jscomp$28$$ = 0; $i$jscomp$28$$ < $str$jscomp$21$$.length; ++$i$jscomp$28$$) {
    65535 < $str$jscomp$21$$.codePointAt($i$jscomp$28$$) && $i$jscomp$28$$++, $len$jscomp$10$$ += 4;
  }
  return $len$jscomp$10$$;
}, $handleException$$ = $e$jscomp$36$$ => {
  $e$jscomp$36$$ instanceof $ExitStatus$$ || "unwind" == $e$jscomp$36$$ || ($checkStackCookie$$(), $e$jscomp$36$$ instanceof WebAssembly.RuntimeError && 0 >= $_emscripten_stack_get_current$$() && $err$$("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), $quit_$$(1, $e$jscomp$36$$));
}, $runtimeKeepaliveCounter$$ = 0, $exitJS$$ = ($status$jscomp$3$$, $implicit$$) => {
  $EXITSTATUS$$ = $status$jscomp$3$$;
  $checkUnflushedContent$$();
  ($noExitRuntime$$ || 0 < $runtimeKeepaliveCounter$$) && !$implicit$$ && $err$$(`program exited (with status: ${$status$jscomp$3$$}), but keepRuntimeAlive() is set (counter=${$runtimeKeepaliveCounter$$}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`);
  $EXITSTATUS$$ = $status$jscomp$3$$;
  $noExitRuntime$$ || 0 < $runtimeKeepaliveCounter$$ || ($Module$$.onExit?.($status$jscomp$3$$), $ABORT$$ = !0);
  $quit_$$($status$jscomp$3$$, new $ExitStatus$$($status$jscomp$3$$));
}, $maybeExit$$ = () => {
  if (!($noExitRuntime$$ || 0 < $runtimeKeepaliveCounter$$)) {
    try {
      $exitJS$$($EXITSTATUS$$);
    } catch ($e$jscomp$37$$) {
      $handleException$$($e$jscomp$37$$);
    }
  }
}, $callUserCallback$$ = $func$jscomp$9$$ => {
  if ($ABORT$$) {
    $err$$("user callback triggered after runtime exited or application aborted.  Ignoring.");
  } else {
    try {
      $func$jscomp$9$$(), $maybeExit$$();
    } catch ($e$jscomp$38$$) {
      $handleException$$($e$jscomp$38$$);
    }
  }
};
function $getFullscreenElement$$() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement;
}
var $safeSetTimeout$$ = $func$jscomp$10$$ => {
  setTimeout(() => {
    $callUserCallback$$($func$jscomp$10$$);
  }, 10000);
}, $Browser$pointerLock$$ = !1, $Browser$moduleContextCreatedCallbacks$$ = [], $Browser$preloadedImages$$ = {};
function $Browser$init$$() {
  function $pointerLockChange$$() {
    $Browser$pointerLock$$ = document.pointerLockElement === $Module$$.canvas;
  }
  if (!$Browser$initted$$) {
    $Browser$initted$$ = !0;
    $preloadPlugins$$.push({canHandle:function($name$jscomp$118$$) {
      return !$Module$$.noImageDecoding && /\.(jpg|jpeg|png|bmp|webp)$/i.test($name$jscomp$118$$);
    }, handle:async function($byteArray$jscomp$3$$, $name$jscomp$119$$) {
      var $b$jscomp$3$$ = new Blob([$byteArray$jscomp$3$$], {type:$Browser$getMimetype$$($name$jscomp$119$$)});
      $b$jscomp$3$$.size !== $byteArray$jscomp$3$$.length && ($b$jscomp$3$$ = new Blob([(new Uint8Array($byteArray$jscomp$3$$)).buffer], {type:$Browser$getMimetype$$($name$jscomp$119$$)}));
      var $url$jscomp$32$$ = URL.createObjectURL($b$jscomp$3$$);
      return new Promise(($resolve$jscomp$2$$, $reject$jscomp$2$$) => {
        var $img$jscomp$2$$ = new Image();
        $img$jscomp$2$$.onload = () => {
          $assert$$($img$jscomp$2$$.complete, `Image ${$name$jscomp$119$$} could not be decoded`);
          var $canvas$jscomp$1$$ = document.createElement("canvas");
          $canvas$jscomp$1$$.width = $img$jscomp$2$$.width;
          $canvas$jscomp$1$$.height = $img$jscomp$2$$.height;
          $canvas$jscomp$1$$.getContext("2d").drawImage($img$jscomp$2$$, 0, 0);
          $Browser$preloadedImages$$[$name$jscomp$119$$] = $canvas$jscomp$1$$;
          URL.revokeObjectURL($url$jscomp$32$$);
          $resolve$jscomp$2$$($byteArray$jscomp$3$$);
        };
        $img$jscomp$2$$.onerror = () => {
          $err$$(`Image ${$url$jscomp$32$$} could not be decoded`);
          $reject$jscomp$2$$();
        };
        $img$jscomp$2$$.src = $url$jscomp$32$$;
      });
    }});
    $preloadPlugins$$.push({canHandle:function($name$jscomp$120$$) {
      return !$Module$$.noAudioDecoding && $name$jscomp$120$$.slice(-4) in {".ogg":1, ".wav":1, ".mp3":1};
    }, handle:async function($byteArray$jscomp$4$$, $name$jscomp$121$$) {
      return new Promise($resolve$jscomp$3$$ => {
        function $finish$$() {
          $done$jscomp$2$$ || ($done$jscomp$2$$ = !0, $resolve$jscomp$3$$($byteArray$jscomp$4$$));
        }
        var $done$jscomp$2$$ = !1, $b$jscomp$4_url$jscomp$33$$ = new Blob([$byteArray$jscomp$4$$], {type:$Browser$getMimetype$$($name$jscomp$121$$)});
        $b$jscomp$4_url$jscomp$33$$ = URL.createObjectURL($b$jscomp$4_url$jscomp$33$$);
        var $audio$$ = new Audio();
        $audio$$.addEventListener("canplaythrough", () => $finish$$($audio$$), !1);
        $audio$$.onerror = function() {
          if (!$done$jscomp$2$$) {
            $err$$(`warning: browser could not fully decode audio ${$name$jscomp$121$$}, trying slower base64 approach`);
            for (var $JSCompiler_temp_const$jscomp$18$$ = "data:audio/x-" + $name$jscomp$121$$.slice(-3) + ";base64,", $ret$jscomp$inline_121$$ = "", $leftchar$jscomp$inline_122$$ = 0, $leftbits$jscomp$inline_123$$ = 0, $i$jscomp$inline_124$$ = 0; $i$jscomp$inline_124$$ < $byteArray$jscomp$4$$.length; $i$jscomp$inline_124$$++) {
              for ($leftchar$jscomp$inline_122$$ = $leftchar$jscomp$inline_122$$ << 8 | $byteArray$jscomp$4$$[$i$jscomp$inline_124$$], $leftbits$jscomp$inline_123$$ += 8; 6 <= $leftbits$jscomp$inline_123$$;) {
                var $curr$jscomp$inline_125$$ = $leftchar$jscomp$inline_122$$ >> $leftbits$jscomp$inline_123$$ - 6 & 63;
                $leftbits$jscomp$inline_123$$ -= 6;
                $ret$jscomp$inline_121$$ += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[$curr$jscomp$inline_125$$];
              }
            }
            2 == $leftbits$jscomp$inline_123$$ ? ($ret$jscomp$inline_121$$ += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[($leftchar$jscomp$inline_122$$ & 3) << 4], $ret$jscomp$inline_121$$ += "==") : 4 == $leftbits$jscomp$inline_123$$ && ($ret$jscomp$inline_121$$ += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[($leftchar$jscomp$inline_122$$ & 15) << 2], $ret$jscomp$inline_121$$ += "=");
            $audio$$.src = $JSCompiler_temp_const$jscomp$18$$ + $ret$jscomp$inline_121$$;
            $finish$$($audio$$);
          }
        };
        $audio$$.src = $b$jscomp$4_url$jscomp$33$$;
        $safeSetTimeout$$(() => {
          $finish$$($audio$$);
        });
      });
    }});
    var $canvas$$ = $Module$$.canvas;
    $canvas$$ && (document.addEventListener("pointerlockchange", $pointerLockChange$$, !1), $Module$$.elementPointerLock && $canvas$$.addEventListener("click", $ev$$ => {
      !$Browser$pointerLock$$ && $Module$$.canvas.requestPointerLock && ($Module$$.canvas.requestPointerLock(), $ev$$.preventDefault());
    }, !1));
  }
}
function $Browser$createContext$$($canvas$jscomp$3$$, $useWebGL$$, $setInModule$$, $webGLContextAttributes$$) {
  if ($useWebGL$$ && $Module$$.ctx && $canvas$jscomp$3$$ == $Module$$.canvas) {
    return $Module$$.ctx;
  }
  var $contextHandle$$;
  if ($useWebGL$$) {
    var $contextAttributes$$ = {antialias:!1, alpha:!1, $majorVersion$:1};
    if ($webGLContextAttributes$$) {
      for (var $attribute$jscomp$1$$ in $webGLContextAttributes$$) {
        $contextAttributes$$[$attribute$jscomp$1$$] = $webGLContextAttributes$$[$attribute$jscomp$1$$];
      }
    }
    if ("undefined" != typeof $GL$$ && ($contextHandle$$ = $GL$createContext$$($canvas$jscomp$3$$, $contextAttributes$$))) {
      var $ctx$jscomp$1$$ = $GL$contexts$$[$contextHandle$$].$GLctx$;
    }
  } else {
    $ctx$jscomp$1$$ = $canvas$jscomp$3$$.getContext("2d");
  }
  if (!$ctx$jscomp$1$$) {
    return null;
  }
  $setInModule$$ && ($useWebGL$$ || $assert$$("undefined" == typeof $GLctx$$, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), $Module$$.ctx = $ctx$jscomp$1$$, $useWebGL$$ && $GL$makeContextCurrent$$($contextHandle$$), $Browser$moduleContextCreatedCallbacks$$.forEach($callback$jscomp$133$$ => $callback$jscomp$133$$()), $Browser$init$$());
  return $ctx$jscomp$1$$;
}
function $Browser$getMimetype$$($name$jscomp$122$$) {
  return {jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", bmp:"image/bmp", ogg:"audio/ogg", wav:"audio/wav", mp3:"audio/mpeg"}[$name$jscomp$122$$.slice($name$jscomp$122$$.lastIndexOf(".") + 1)];
}
var $Browser$$ = {}, $Browser$initted$$, $EGL$errorCode$$ = 12288, $EGL$defaultDisplayInitialized$$ = !1, $EGL$currentContext$$ = 0, $EGL$currentReadSurface$$ = 0, $EGL$currentDrawSurface$$ = 0, $EGL$contextAttributes$$ = {alpha:!1, depth:!1, stencil:!1, antialias:!1}, $EGL$stringCache$$ = {}, $EGL$context$$, $GLctx$$, $webgl_enable_ANGLE_instanced_arrays$$ = $ctx$jscomp$2$$ => {
  var $ext$jscomp$1$$ = $ctx$jscomp$2$$.getExtension("ANGLE_instanced_arrays");
  $ext$jscomp$1$$ && ($ctx$jscomp$2$$.vertexAttribDivisor = ($index$jscomp$102$$, $divisor$jscomp$3$$) => $ext$jscomp$1$$.vertexAttribDivisorANGLE($index$jscomp$102$$, $divisor$jscomp$3$$), $ctx$jscomp$2$$.drawArraysInstanced = ($mode$jscomp$53$$, $first$jscomp$4$$, $count$jscomp$39$$, $primcount$jscomp$2$$) => $ext$jscomp$1$$.drawArraysInstancedANGLE($mode$jscomp$53$$, $first$jscomp$4$$, $count$jscomp$39$$, $primcount$jscomp$2$$), $ctx$jscomp$2$$.drawElementsInstanced = ($mode$jscomp$54$$, $count$jscomp$40$$, 
  $type$jscomp$176$$, $indices$$, $primcount$jscomp$3$$) => $ext$jscomp$1$$.drawElementsInstancedANGLE($mode$jscomp$54$$, $count$jscomp$40$$, $type$jscomp$176$$, $indices$$, $primcount$jscomp$3$$));
}, $webgl_enable_OES_vertex_array_object$$ = $ctx$jscomp$3$$ => {
  var $ext$jscomp$2$$ = $ctx$jscomp$3$$.getExtension("OES_vertex_array_object");
  $ext$jscomp$2$$ && ($ctx$jscomp$3$$.createVertexArray = () => $ext$jscomp$2$$.createVertexArrayOES(), $ctx$jscomp$3$$.deleteVertexArray = $vao$$ => $ext$jscomp$2$$.deleteVertexArrayOES($vao$$), $ctx$jscomp$3$$.bindVertexArray = $vao$jscomp$1$$ => $ext$jscomp$2$$.bindVertexArrayOES($vao$jscomp$1$$), $ctx$jscomp$3$$.isVertexArray = $vao$jscomp$2$$ => $ext$jscomp$2$$.isVertexArrayOES($vao$jscomp$2$$));
}, $webgl_enable_WEBGL_draw_buffers$$ = $ctx$jscomp$4$$ => {
  var $ext$jscomp$3$$ = $ctx$jscomp$4$$.getExtension("WEBGL_draw_buffers");
  $ext$jscomp$3$$ && ($ctx$jscomp$4$$.drawBuffers = ($n$jscomp$5$$, $bufs$$) => $ext$jscomp$3$$.drawBuffersWEBGL($n$jscomp$5$$, $bufs$$));
}, $getEmscriptenSupportedExtensions$$ = $ctx$jscomp$9$$ => {
  var $supportedExtensions$$ = "ANGLE_instanced_arrays EXT_blend_minmax EXT_disjoint_timer_query EXT_frag_depth EXT_shader_texture_lod EXT_sRGB OES_element_index_uint OES_fbo_render_mipmap OES_standard_derivatives OES_texture_float OES_texture_half_float OES_texture_half_float_linear OES_vertex_array_object WEBGL_color_buffer_float WEBGL_depth_texture WEBGL_draw_buffers EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
  return ($ctx$jscomp$9$$.getSupportedExtensions() || []).filter($ext$jscomp$4$$ => $supportedExtensions$$.includes($ext$jscomp$4$$));
}, $GL$counter$$ = 1, $GL$buffers$$ = [], $GL$programs$$ = [], $GL$framebuffers$$ = [], $GL$renderbuffers$$ = [], $GL$textures$$ = [], $GL$shaders$$ = [], $GL$vaos$$ = [], $GL$contexts$$ = [], $GL$queries$$ = [], $GL$stringCache$$ = {}, $GL$unpackAlignment$$ = 4, $GL$unpackRowLength$$ = 0, $GL$getNewId$$ = $table$$ => {
  for (var $ret$jscomp$8$$ = $GL$counter$$++, $i$jscomp$30$$ = $table$$.length; $i$jscomp$30$$ < $ret$jscomp$8$$; $i$jscomp$30$$++) {
    $table$$[$i$jscomp$30$$] = null;
  }
  return $ret$jscomp$8$$;
}, $GL$genObject$$ = ($n$jscomp$6$$, $buffers$jscomp$2$$, $createFunction$$, $objectTable$$) => {
  for (var $i$jscomp$31$$ = 0; $i$jscomp$31$$ < $n$jscomp$6$$; $i$jscomp$31$$++) {
    var $buffer$jscomp$41$$ = $GLctx$$[$createFunction$$](), $id$jscomp$11$$ = $buffer$jscomp$41$$ && $GL$getNewId$$($objectTable$$);
    $buffer$jscomp$41$$ ? ($buffer$jscomp$41$$.name = $id$jscomp$11$$, $objectTable$$[$id$jscomp$11$$] = $buffer$jscomp$41$$) : $GL$lastError$$ ||= 1282;
    $HEAP32$$[$buffers$jscomp$2$$ + 4 * $i$jscomp$31$$ >> 2] = $id$jscomp$11$$;
  }
}, $GL$createContext$$ = ($canvas$jscomp$9$$, $webGLContextAttributes$jscomp$1$$) => {
  $canvas$jscomp$9$$.$g$ || ($canvas$jscomp$9$$.$g$ = $canvas$jscomp$9$$.getContext, $canvas$jscomp$9$$.getContext = function($ver$$, $attrs_gl$$) {
    $attrs_gl$$ = $canvas$jscomp$9$$.$g$($ver$$, $attrs_gl$$);
    return "webgl" == $ver$$ == $attrs_gl$$ instanceof WebGLRenderingContext ? $attrs_gl$$ : null;
  });
  var $ctx$jscomp$10$$ = $canvas$jscomp$9$$.getContext("webgl", $webGLContextAttributes$jscomp$1$$);
  return $ctx$jscomp$10$$ ? $GL$registerContext$$($ctx$jscomp$10$$, $webGLContextAttributes$jscomp$1$$) : 0;
}, $GL$registerContext$$ = ($ctx$jscomp$11$$, $webGLContextAttributes$jscomp$2$$) => {
  var $handle$jscomp$18$$ = $GL$getNewId$$($GL$contexts$$), $context$jscomp$6$$ = {handle:$handle$jscomp$18$$, attributes:$webGLContextAttributes$jscomp$2$$, version:$webGLContextAttributes$jscomp$2$$.$majorVersion$, $GLctx$:$ctx$jscomp$11$$};
  $ctx$jscomp$11$$.canvas && ($ctx$jscomp$11$$.canvas.$GLctxObject$ = $context$jscomp$6$$);
  $GL$contexts$$[$handle$jscomp$18$$] = $context$jscomp$6$$;
  ("undefined" == typeof $webGLContextAttributes$jscomp$2$$.$enableExtensionsByDefault$ || $webGLContextAttributes$jscomp$2$$.$enableExtensionsByDefault$) && $GL$initExtensions$$($context$jscomp$6$$);
  return $handle$jscomp$18$$;
}, $GL$makeContextCurrent$$ = $contextHandle$jscomp$1$$ => {
  $GL$currentContext$$ = $GL$contexts$$[$contextHandle$jscomp$1$$];
  $Module$$.ctx = $GLctx$$ = $GL$currentContext$$?.$GLctx$;
}, $GL$initExtensions$$ = $context$jscomp$7$$ => {
  $context$jscomp$7$$ ||= $GL$currentContext$$;
  if (!$context$jscomp$7$$.$initExtensionsDone$) {
    $context$jscomp$7$$.$initExtensionsDone$ = !0;
    var $GLctx$jscomp$1$$ = $context$jscomp$7$$.$GLctx$;
    $GLctx$jscomp$1$$.$multiDrawWebgl$ = $GLctx$jscomp$1$$.getExtension("WEBGL_multi_draw");
    $GLctx$jscomp$1$$.$extPolygonOffsetClamp$ = $GLctx$jscomp$1$$.getExtension("EXT_polygon_offset_clamp");
    $GLctx$jscomp$1$$.$extClipControl$ = $GLctx$jscomp$1$$.getExtension("EXT_clip_control");
    $GLctx$jscomp$1$$.$webglPolygonMode$ = $GLctx$jscomp$1$$.getExtension("WEBGL_polygon_mode");
    $webgl_enable_ANGLE_instanced_arrays$$($GLctx$jscomp$1$$);
    $webgl_enable_OES_vertex_array_object$$($GLctx$jscomp$1$$);
    $webgl_enable_WEBGL_draw_buffers$$($GLctx$jscomp$1$$);
    $GLctx$jscomp$1$$.$disjointTimerQueryExt$ = $GLctx$jscomp$1$$.getExtension("EXT_disjoint_timer_query");
    $getEmscriptenSupportedExtensions$$($GLctx$jscomp$1$$).forEach($ext$jscomp$5$$ => {
      $ext$jscomp$5$$.includes("lose_context") || $ext$jscomp$5$$.includes("debug") || $GLctx$jscomp$1$$.getExtension($ext$jscomp$5$$);
    });
  }
}, $GL$$ = {}, $GL$lastError$$, $GL$currentContext$$, $stringToNewUTF8$$ = $str$jscomp$23$$ => {
  var $size$jscomp$32$$ = $lengthBytesUTF8$$($str$jscomp$23$$) + 1, $ret$jscomp$9$$ = $_malloc$$($size$jscomp$32$$);
  $ret$jscomp$9$$ && $stringToUTF8$$($str$jscomp$23$$, $ret$jscomp$9$$, $size$jscomp$32$$);
  return $ret$jscomp$9$$;
}, $setMainLoop$$ = ($iterFunc$$, $fps$$, $simulateInfiniteLoop$$, $arg$jscomp$12$$, $noSetTiming$$) => {
  function $checkIsRunning$$() {
    return $thisMainLoopId$$ < $MainLoop$currentlyRunningMainloop$$ ? ($maybeExit$$(), !1) : !0;
  }
  $assert$$(!$MainLoop$func$$, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  $MainLoop$func$$ = $iterFunc$$;
  $MainLoop$arg$$ = $arg$jscomp$12$$;
  var $thisMainLoopId$$ = $MainLoop$currentlyRunningMainloop$$;
  $MainLoop$running$$ = !1;
  $MainLoop$runner$$ = function() {
    if (!$ABORT$$) {
      if (0 < $MainLoop$queue$$.length) {
        var $blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$ = $MainLoop$queue$$.shift();
        $blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$.$func$($blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$.$arg$);
        if ($MainLoop$remainingBlockers$$) {
          var $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ = $MainLoop$remainingBlockers$$, $expected$jscomp$inline_145_next$jscomp$1$$ = 0 == $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ % 1 ? $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ - 1 : Math.floor($post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$);
          $MainLoop$remainingBlockers$$ = $blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$.$counted$ ? $expected$jscomp$inline_145_next$jscomp$1$$ : (8 * $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ + ($expected$jscomp$inline_145_next$jscomp$1$$ + 0.5)) / 9;
        }
        $Module$$.setStatus && ($blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$ = $Module$$.statusMessage || "Please wait...", $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ = $MainLoop$remainingBlockers$$ ?? 0, $expected$jscomp$inline_145_next$jscomp$1$$ = $MainLoop$$.$expectedBlockers$ ?? 0, $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ ? $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ < $expected$jscomp$inline_145_next$jscomp$1$$ ? 
        $Module$$.setStatus("{message} ({expected - remaining}/{expected})") : $Module$$.setStatus($blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$) : $Module$$.setStatus(""));
        $checkIsRunning$$() && setTimeout($MainLoop$runner$$, 0);
      } else {
        if ($checkIsRunning$$()) {
          if ($MainLoop$currentFrameNumber$$ = $MainLoop$currentFrameNumber$$ + 1 | 0, 1 == $MainLoop$timingMode$$ && 1 < $MainLoop$timingValue$$ && 0 != $MainLoop$currentFrameNumber$$ % $MainLoop$timingValue$$) {
            $MainLoop$scheduler$$();
          } else {
            0 == $MainLoop$timingMode$$ && ($MainLoop$tickStartTime$$ = performance.now());
            "timeout" === $MainLoop$method$$ && $Module$$.ctx && ($warnOnce$$("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), $MainLoop$method$$ = "");
            a: {
              if (!$ABORT$$) {
                for ($blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$ of $MainLoop$preMainLoop$$) {
                  if (!1 === $blocker_message$jscomp$inline_143_pre$jscomp$inline_148$$()) {
                    break a;
                  }
                }
                $callUserCallback$$($iterFunc$$);
                for ($post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$ of $MainLoop$postMainLoop$$) {
                  $post$jscomp$inline_149_remaining_remaining$jscomp$inline_144$$();
                }
                $checkStackCookie$$();
              }
            }
            $checkIsRunning$$() && $MainLoop$scheduler$$();
          }
        }
      }
    }
  };
  $noSetTiming$$ || (0 < $fps$$ ? $_emscripten_set_main_loop_timing$$(0, 1000.0 / $fps$$) : $_emscripten_set_main_loop_timing$$(1, 1), $MainLoop$scheduler$$());
  if ($simulateInfiniteLoop$$) {
    throw "unwind";
  }
}, $MainLoop$running$$ = !1, $MainLoop$scheduler$$ = null, $MainLoop$method$$ = "", $MainLoop$currentlyRunningMainloop$$ = 0, $MainLoop$func$$ = null, $MainLoop$arg$$ = 0, $MainLoop$timingMode$$ = 0, $MainLoop$timingValue$$ = 0, $MainLoop$currentFrameNumber$$ = 0, $MainLoop$queue$$ = [], $MainLoop$preMainLoop$$ = [], $MainLoop$postMainLoop$$ = [];
function $MainLoop$pause$$() {
  $MainLoop$scheduler$$ = null;
  $MainLoop$currentlyRunningMainloop$$++;
}
var $MainLoop$nextRAF$$ = 0;
function $MainLoop$requestAnimationFrame$$($func$jscomp$16$$) {
  if ("function" == typeof requestAnimationFrame) {
    requestAnimationFrame($func$jscomp$16$$);
  } else {
    var $now$jscomp$inline_152$$ = Date.now();
    if (0 === $MainLoop$nextRAF$$) {
      $MainLoop$nextRAF$$ = $now$jscomp$inline_152$$ + 1000 / 60;
    } else {
      for (; $now$jscomp$inline_152$$ + 2 >= $MainLoop$nextRAF$$;) {
        $MainLoop$nextRAF$$ += 1000 / 60;
      }
    }
    setTimeout($func$jscomp$16$$, Math.max($MainLoop$nextRAF$$ - $now$jscomp$inline_152$$, 0));
  }
}
var $MainLoop$$ = {}, $MainLoop$runner$$, $MainLoop$remainingBlockers$$, $MainLoop$tickStartTime$$, $MainLoop$setImmediate$$, $_emscripten_set_main_loop_timing$$ = ($mode$jscomp$55$$, $value$jscomp$128$$) => {
  $MainLoop$timingMode$$ = $mode$jscomp$55$$;
  $MainLoop$timingValue$$ = $value$jscomp$128$$;
  if ($MainLoop$func$$) {
    if ($MainLoop$running$$ ||= !0, 0 == $mode$jscomp$55$$) {
      $MainLoop$scheduler$$ = function() {
        setTimeout($MainLoop$runner$$, Math.max(0, $MainLoop$tickStartTime$$ + $value$jscomp$128$$ - performance.now()) | 0);
      }, $MainLoop$method$$ = "timeout";
    } else if (1 == $mode$jscomp$55$$) {
      $MainLoop$scheduler$$ = function() {
        $MainLoop$requestAnimationFrame$$($MainLoop$runner$$);
      }, $MainLoop$method$$ = "rAF";
    } else if (2 == $mode$jscomp$55$$) {
      if ("undefined" == typeof $MainLoop$setImmediate$$) {
        if ("undefined" == typeof setImmediate) {
          var $setImmediates$$ = [];
          addEventListener("message", $event$jscomp$22$$ => {
            if ("setimmediate" === $event$jscomp$22$$.data || "setimmediate" === $event$jscomp$22$$.data.target) {
              $event$jscomp$22$$.stopPropagation(), $setImmediates$$.shift()();
            }
          }, !0);
          $MainLoop$setImmediate$$ = $func$jscomp$17$$ => {
            $setImmediates$$.push($func$jscomp$17$$);
            if ($ENVIRONMENT_IS_WORKER$$) {
              let $$jscomp$logical$assign$tmp745725642$9$$;
              ($$jscomp$logical$assign$tmp745725642$9$$ = $Module$$).setImmediates ?? ($$jscomp$logical$assign$tmp745725642$9$$.setImmediates = []);
              $Module$$.setImmediates.push($func$jscomp$17$$);
              postMessage({target:"setimmediate"});
            } else {
              postMessage("setimmediate", "*");
            }
          };
        } else {
          $MainLoop$setImmediate$$ = setImmediate;
        }
      }
      $MainLoop$scheduler$$ = function() {
        $MainLoop$setImmediate$$($MainLoop$runner$$);
      };
      $MainLoop$method$$ = "immediate";
    }
  } else {
    $err$$("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
  }
}, $readEmAsmArgsArray$$ = [], $readEmAsmArgs$$ = ($sigPtr$$, $buf$jscomp$16$$) => {
  $assert$$(Array.isArray($readEmAsmArgsArray$$));
  $assert$$(0 == $buf$jscomp$16$$ % 16);
  $readEmAsmArgsArray$$.length = 0;
  for (var $ch$jscomp$2$$; $ch$jscomp$2$$ = $HEAPU8$$[$sigPtr$$++];) {
    var $chr_wide$$ = String.fromCharCode($ch$jscomp$2$$), $validChars$$ = ["d", "f", "i", "p"];
    $validChars$$.push("j");
    $assert$$($validChars$$.includes($chr_wide$$), `Invalid character ${$ch$jscomp$2$$}("${$chr_wide$$}") in readEmAsmArgs! Use only [${$validChars$$}], and do not specify "v" for void return argument.`);
    $chr_wide$$ = 105 != $ch$jscomp$2$$;
    $chr_wide$$ &= 112 != $ch$jscomp$2$$;
    $buf$jscomp$16$$ += $chr_wide$$ && $buf$jscomp$16$$ % 8 ? 4 : 0;
    $readEmAsmArgsArray$$.push(112 == $ch$jscomp$2$$ ? $HEAPU32$$[$buf$jscomp$16$$ >> 2] : 106 == $ch$jscomp$2$$ ? $HEAP64$$[$buf$jscomp$16$$ >> 3] : 105 == $ch$jscomp$2$$ ? $HEAP32$$[$buf$jscomp$16$$ >> 2] : $HEAPF64$$[$buf$jscomp$16$$ >> 3]);
    $buf$jscomp$16$$ += $chr_wide$$ ? 8 : 4;
  }
  return $readEmAsmArgsArray$$;
}, $runMainThreadEmAsm$$ = ($emAsmAddr$$, $args$jscomp$13_sigPtr$jscomp$3$$, $argbuf$jscomp$2$$) => {
  $args$jscomp$13_sigPtr$jscomp$3$$ = $readEmAsmArgs$$($args$jscomp$13_sigPtr$jscomp$3$$, $argbuf$jscomp$2$$);
  $assert$$($ASM_CONSTS$$.hasOwnProperty($emAsmAddr$$), `No EM_ASM constant found at address ${$emAsmAddr$$}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return $ASM_CONSTS$$[$emAsmAddr$$](...$args$jscomp$13_sigPtr$jscomp$3$$);
};
function $JSCompiler_StaticMethods__removeHandler$$($i$jscomp$35$$) {
  var $h$jscomp$10$$ = $JSEvents$$.$eventHandlers$[$i$jscomp$35$$];
  $h$jscomp$10$$.target.removeEventListener($h$jscomp$10$$.$eventTypeString$, $h$jscomp$10$$.$eventListenerFunc$, $h$jscomp$10$$.$useCapture$);
  $JSEvents$$.$eventHandlers$.splice($i$jscomp$35$$, 1);
}
function $JSCompiler_StaticMethods_deferCall$$($targetFunction$$, $precedence$$, $argsList$$) {
  function $arraysHaveEqualContent$$($arrA$$, $arrB$$) {
    if ($arrA$$.length != $arrB$$.length) {
      return !1;
    }
    for (var $i$jscomp$33$$ in $arrA$$) {
      if ($arrA$$[$i$jscomp$33$$] != $arrB$$[$i$jscomp$33$$]) {
        return !1;
      }
    }
    return !0;
  }
  for (var $call$$ of $JSEvents$$.$deferredCalls$) {
    if ($call$$.$targetFunction$ == $targetFunction$$ && $arraysHaveEqualContent$$($call$$.$argsList$, $argsList$$)) {
      return;
    }
  }
  $JSEvents$$.$deferredCalls$.push({$targetFunction$:$targetFunction$$, $precedence$:$precedence$$, $argsList$:$argsList$$});
  $JSEvents$$.$deferredCalls$.sort(($x$jscomp$93$$, $y$jscomp$78$$) => $x$jscomp$93$$.$precedence$ < $y$jscomp$78$$.$precedence$);
}
function $JSCompiler_StaticMethods_removeDeferredCalls$$($targetFunction$jscomp$1$$) {
  $JSEvents$$.$deferredCalls$ = $JSEvents$$.$deferredCalls$.filter($call$jscomp$1$$ => $call$jscomp$1$$.$targetFunction$ != $targetFunction$jscomp$1$$);
}
function $JSCompiler_StaticMethods_canPerformEventHandlerRequests$$() {
  return navigator.userActivation ? navigator.userActivation.isActive : $JSEvents$$.$inEventHandler$ && $JSEvents$$.$currentEventHandler$.$allowsDeferredCalls$;
}
function $JSCompiler_StaticMethods_runDeferredCalls$$() {
  if ($JSCompiler_StaticMethods_canPerformEventHandlerRequests$$()) {
    var $deferredCalls$$ = $JSEvents$$.$deferredCalls$;
    $JSEvents$$.$deferredCalls$ = [];
    for (var $call$jscomp$2$$ of $deferredCalls$$) {
      $call$jscomp$2$$.$targetFunction$(...$call$jscomp$2$$.$argsList$);
    }
  }
}
function $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$$) {
  if (!$eventHandler$$.target) {
    return $err$$("registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:"), console.dir($eventHandler$$), -4;
  }
  if ($eventHandler$$.$callbackfunc$) {
    $eventHandler$$.$eventListenerFunc$ = function($event$jscomp$23$$) {
      ++$JSEvents$$.$inEventHandler$;
      $JSEvents$$.$currentEventHandler$ = $eventHandler$$;
      $JSCompiler_StaticMethods_runDeferredCalls$$();
      $eventHandler$$.$handlerFunc$($event$jscomp$23$$);
      $JSCompiler_StaticMethods_runDeferredCalls$$();
      --$JSEvents$$.$inEventHandler$;
    }, $eventHandler$$.target.addEventListener($eventHandler$$.$eventTypeString$, $eventHandler$$.$eventListenerFunc$, $eventHandler$$.$useCapture$), $JSEvents$$.$eventHandlers$.push($eventHandler$$);
  } else {
    for (var $i$jscomp$36$$ = 0; $i$jscomp$36$$ < $JSEvents$$.$eventHandlers$.length; ++$i$jscomp$36$$) {
      $JSEvents$$.$eventHandlers$[$i$jscomp$36$$].target == $eventHandler$$.target && $JSEvents$$.$eventHandlers$[$i$jscomp$36$$].$eventTypeString$ == $eventHandler$$.$eventTypeString$ && $JSCompiler_StaticMethods__removeHandler$$($i$jscomp$36$$--);
    }
  }
  return 0;
}
function $JSCompiler_StaticMethods_getNodeNameForTarget$$($target$jscomp$94$$) {
  return $target$jscomp$94$$ ? $target$jscomp$94$$ == window ? "#window" : $target$jscomp$94$$ == screen ? "#screen" : $target$jscomp$94$$?.nodeName || "" : "";
}
var $JSEvents$$ = {$batteryEvent$:0, $gamepadEvent$:0, $keyEvent$:0, $mouseEvent$:0, $wheelEvent$:0, $uiEvent$:0, $focusEvent$:0, $deviceOrientationEvent$:0, $orientationChangeEvent$:0, $deviceMotionEvent$:0, $fullscreenChangeEvent$:0, $pointerlockChangeEvent$:0, $visibilityChangeEvent$:0, $touchEvent$:0, $memcpy$($target$jscomp$92$$, $src$jscomp$4$$, $size$jscomp$33$$) {
  $HEAP8$$.set($HEAP8$$.subarray($src$jscomp$4$$, $src$jscomp$4$$ + $size$jscomp$33$$), $target$jscomp$92$$);
}, $removeAllEventListeners$() {
  for (; $JSEvents$$.$eventHandlers$.length;) {
    $JSCompiler_StaticMethods__removeHandler$$($JSEvents$$.$eventHandlers$.length - 1);
  }
  $JSEvents$$.$deferredCalls$ = [];
}, $inEventHandler$:0, $deferredCalls$:[], $eventHandlers$:[], $removeAllHandlersOnTarget$:($target$jscomp$93$$, $eventTypeString$$) => {
  for (var $i$jscomp$34$$ = 0; $i$jscomp$34$$ < $JSEvents$$.$eventHandlers$.length; ++$i$jscomp$34$$) {
    $JSEvents$$.$eventHandlers$[$i$jscomp$34$$].target != $target$jscomp$93$$ || $eventTypeString$$ && $eventTypeString$$ != $JSEvents$$.$eventHandlers$[$i$jscomp$34$$].$eventTypeString$ || $JSCompiler_StaticMethods__removeHandler$$($i$jscomp$34$$--);
  }
}, fullscreenEnabled() {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled;
}}, $specialHTMLTargets$$ = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0], $findEventTarget$$ = $cString$jscomp$inline_154_target$jscomp$95$$ => {
  $cString$jscomp$inline_154_target$jscomp$95$$ = 2 < $cString$jscomp$inline_154_target$jscomp$95$$ ? $UTF8ToString$$($cString$jscomp$inline_154_target$jscomp$95$$) : $cString$jscomp$inline_154_target$jscomp$95$$;
  return $specialHTMLTargets$$[$cString$jscomp$inline_154_target$jscomp$95$$] || ("undefined" != typeof document ? document.querySelector($cString$jscomp$inline_154_target$jscomp$95$$) : null);
}, $stringToUTF8OnStack$$ = $str$jscomp$25$$ => {
  var $size$jscomp$34$$ = $lengthBytesUTF8$$($str$jscomp$25$$) + 1, $ret$jscomp$11$$ = $__emscripten_stack_alloc$$($size$jscomp$34$$);
  $stringToUTF8$$($str$jscomp$25$$, $ret$jscomp$11$$, $size$jscomp$34$$);
  return $ret$jscomp$11$$;
}, $getCanvasElementSize$$ = $canvas$jscomp$inline_159_target$jscomp$97_target$jscomp$inline_156$$ => {
  var $sp$$ = $_emscripten_stack_get_current$$(), $size$jscomp$35_w$jscomp$15$$ = $__emscripten_stack_alloc$$(8), $h$jscomp$11$$ = $size$jscomp$35_w$jscomp$15$$ + 4;
  $canvas$jscomp$inline_159_target$jscomp$97_target$jscomp$inline_156$$ = $stringToUTF8OnStack$$($canvas$jscomp$inline_159_target$jscomp$97_target$jscomp$inline_156$$.id);
  if ($canvas$jscomp$inline_159_target$jscomp$97_target$jscomp$inline_156$$ = $findEventTarget$$($canvas$jscomp$inline_159_target$jscomp$97_target$jscomp$inline_156$$)) {
    $HEAP32$$[$size$jscomp$35_w$jscomp$15$$ >> 2] = $canvas$jscomp$inline_159_target$jscomp$97_target$jscomp$inline_156$$.width, $HEAP32$$[$h$jscomp$11$$ >> 2] = $canvas$jscomp$inline_159_target$jscomp$97_target$jscomp$inline_156$$.height;
  }
  $size$jscomp$35_w$jscomp$15$$ = [$HEAP32$$[$size$jscomp$35_w$jscomp$15$$ >> 2], $HEAP32$$[$h$jscomp$11$$ >> 2]];
  $__emscripten_stack_restore$$($sp$$);
  return $size$jscomp$35_w$jscomp$15$$;
}, $_emscripten_set_canvas_element_size$$ = ($canvas$jscomp$11_target$jscomp$98$$, $width$jscomp$32$$, $height$jscomp$27$$) => {
  $canvas$jscomp$11_target$jscomp$98$$ = $findEventTarget$$($canvas$jscomp$11_target$jscomp$98$$);
  if (!$canvas$jscomp$11_target$jscomp$98$$) {
    return -4;
  }
  $canvas$jscomp$11_target$jscomp$98$$.width = $width$jscomp$32$$;
  $canvas$jscomp$11_target$jscomp$98$$.height = $height$jscomp$27$$;
  return 0;
}, $setCanvasElementSize$$ = ($target$jscomp$99_targetInt$jscomp$1$$, $width$jscomp$33$$, $height$jscomp$28$$) => {
  if ($target$jscomp$99_targetInt$jscomp$1$$.$controlTransferredOffscreen$) {
    var $sp$jscomp$1$$ = $_emscripten_stack_get_current$$();
    $target$jscomp$99_targetInt$jscomp$1$$ = $stringToUTF8OnStack$$($target$jscomp$99_targetInt$jscomp$1$$.id);
    $_emscripten_set_canvas_element_size$$($target$jscomp$99_targetInt$jscomp$1$$, $width$jscomp$33$$, $height$jscomp$28$$);
    $__emscripten_stack_restore$$($sp$jscomp$1$$);
  } else {
    $target$jscomp$99_targetInt$jscomp$1$$.width = $width$jscomp$33$$, $target$jscomp$99_targetInt$jscomp$1$$.height = $height$jscomp$28$$;
  }
}, $currentFullscreenStrategy$$ = {}, $wasmTable$$, $registerRestoreOldStyle$$ = $canvas$jscomp$12$$ => {
  function $restoreOldStyle$$() {
    $getFullscreenElement$$() || (document.removeEventListener("fullscreenchange", $restoreOldStyle$$), document.removeEventListener("webkitfullscreenchange", $restoreOldStyle$$), $setCanvasElementSize$$($canvas$jscomp$12$$, $oldWidth$$, $oldHeight$$), $canvas$jscomp$12$$.style.width = $oldCssWidth$$, $canvas$jscomp$12$$.style.height = $oldCssHeight$$, $canvas$jscomp$12$$.style.backgroundColor = $oldBackgroundColor$$, $oldDocumentBackgroundColor$$ || (document.body.style.backgroundColor = "white"), 
    document.body.style.backgroundColor = $oldDocumentBackgroundColor$$, $canvas$jscomp$12$$.style.paddingLeft = $oldPaddingLeft$$, $canvas$jscomp$12$$.style.paddingRight = $oldPaddingRight$$, $canvas$jscomp$12$$.style.paddingTop = $oldPaddingTop$$, $canvas$jscomp$12$$.style.paddingBottom = $oldPaddingBottom$$, $canvas$jscomp$12$$.style.marginLeft = $oldMarginLeft$$, $canvas$jscomp$12$$.style.marginRight = $oldMarginRight$$, $canvas$jscomp$12$$.style.marginTop = $oldMarginTop$$, $canvas$jscomp$12$$.style.marginBottom = 
    $oldMarginBottom$$, document.body.style.margin = $oldDocumentBodyMargin$$, document.documentElement.style.overflow = $oldDocumentOverflow$$, document.body.scroll = $oldDocumentScroll$$, $canvas$jscomp$12$$.style.$imageRendering$ = $oldImageRendering$$, $canvas$jscomp$12$$.$GLctxObject$ && $canvas$jscomp$12$$.$GLctxObject$.$GLctx$.viewport(0, 0, $oldWidth$$, $oldHeight$$), $currentFullscreenStrategy$$.$canvasResizedCallback$ && $wasmTable$$.get($currentFullscreenStrategy$$.$canvasResizedCallback$)(37, 
    0, $currentFullscreenStrategy$$.$canvasResizedCallbackUserData$));
  }
  var $canvasSize$$ = $getCanvasElementSize$$($canvas$jscomp$12$$), $oldWidth$$ = $canvasSize$$[0], $oldHeight$$ = $canvasSize$$[1], $oldCssWidth$$ = $canvas$jscomp$12$$.style.width, $oldCssHeight$$ = $canvas$jscomp$12$$.style.height, $oldBackgroundColor$$ = $canvas$jscomp$12$$.style.backgroundColor, $oldDocumentBackgroundColor$$ = document.body.style.backgroundColor, $oldPaddingLeft$$ = $canvas$jscomp$12$$.style.paddingLeft, $oldPaddingRight$$ = $canvas$jscomp$12$$.style.paddingRight, $oldPaddingTop$$ = 
  $canvas$jscomp$12$$.style.paddingTop, $oldPaddingBottom$$ = $canvas$jscomp$12$$.style.paddingBottom, $oldMarginLeft$$ = $canvas$jscomp$12$$.style.marginLeft, $oldMarginRight$$ = $canvas$jscomp$12$$.style.marginRight, $oldMarginTop$$ = $canvas$jscomp$12$$.style.marginTop, $oldMarginBottom$$ = $canvas$jscomp$12$$.style.marginBottom, $oldDocumentBodyMargin$$ = document.body.style.margin, $oldDocumentOverflow$$ = document.documentElement.style.overflow, $oldDocumentScroll$$ = document.body.scroll, 
  $oldImageRendering$$ = $canvas$jscomp$12$$.style.$imageRendering$;
  document.addEventListener("fullscreenchange", $restoreOldStyle$$);
  document.addEventListener("webkitfullscreenchange", $restoreOldStyle$$);
}, $setLetterbox$$ = ($element$jscomp$8$$, $topBottom$$, $leftRight$$) => {
  $element$jscomp$8$$.style.paddingLeft = $element$jscomp$8$$.style.paddingRight = $leftRight$$ + "px";
  $element$jscomp$8$$.style.paddingTop = $element$jscomp$8$$.style.paddingBottom = $topBottom$$ + "px";
}, $getBoundingClientRect$$ = $e$jscomp$39$$ => 0 > $specialHTMLTargets$$.indexOf($e$jscomp$39$$) ? $e$jscomp$39$$.getBoundingClientRect() : {left:0, top:0}, $JSEvents_requestFullscreen$$ = ($target$jscomp$101$$, $strategy$jscomp$1$$) => {
  if (0 != $strategy$jscomp$1$$.$scaleMode$ || 0 != $strategy$jscomp$1$$.$canvasResolutionScaleMode$) {
    $registerRestoreOldStyle$$($target$jscomp$101$$);
    var $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ = $strategy$jscomp$1$$.$softFullscreen$ ? innerWidth : screen.width, $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ = $strategy$jscomp$1$$.$softFullscreen$ ? innerHeight : screen.height, $rect$jscomp$inline_166_windowedCssHeight$jscomp$inline_168$$ = $getBoundingClientRect$$($target$jscomp$101$$), $desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$ = $rect$jscomp$inline_166_windowedCssHeight$jscomp$inline_168$$.width;
    $rect$jscomp$inline_166_windowedCssHeight$jscomp$inline_168$$ = $rect$jscomp$inline_166_windowedCssHeight$jscomp$inline_168$$.height;
    var $canvasSize$jscomp$inline_169_windowedRttHeight$jscomp$inline_171$$ = $getCanvasElementSize$$($target$jscomp$101$$), $windowedRttWidth$jscomp$inline_170$$ = $canvasSize$jscomp$inline_169_windowedRttHeight$jscomp$inline_171$$[0];
    $canvasSize$jscomp$inline_169_windowedRttHeight$jscomp$inline_171$$ = $canvasSize$jscomp$inline_169_windowedRttHeight$jscomp$inline_171$$[1];
    3 == $strategy$jscomp$1$$.$scaleMode$ ? ($setLetterbox$$($target$jscomp$101$$, ($cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ - $rect$jscomp$inline_166_windowedCssHeight$jscomp$inline_168$$) / 2, ($cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ - $desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$) / 2), $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ = $desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$, 
    $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ = $rect$jscomp$inline_166_windowedCssHeight$jscomp$inline_168$$) : 2 == $strategy$jscomp$1$$.$scaleMode$ && ($cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ * $canvasSize$jscomp$inline_169_windowedRttHeight$jscomp$inline_171$$ < $windowedRttWidth$jscomp$inline_170$$ * $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ ? ($desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$ = 
    $canvasSize$jscomp$inline_169_windowedRttHeight$jscomp$inline_171$$ * $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ / $windowedRttWidth$jscomp$inline_170$$, $setLetterbox$$($target$jscomp$101$$, ($cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ - $desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$) / 2, 0), $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ = $desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$) : 
    ($desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$ = $windowedRttWidth$jscomp$inline_170$$ * $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ / $canvasSize$jscomp$inline_169_windowedRttHeight$jscomp$inline_171$$, $setLetterbox$$($target$jscomp$101$$, 0, ($cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ - $desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$) / 2), $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ = 
    $desiredCssHeight$jscomp$inline_172_desiredCssWidth$jscomp$inline_173_windowedCssWidth$jscomp$inline_167$$));
    var $$jscomp$inline_174_dpiScale$jscomp$inline_176$$;
    ($$jscomp$inline_174_dpiScale$jscomp$inline_176$$ = $target$jscomp$101$$.style).backgroundColor || ($$jscomp$inline_174_dpiScale$jscomp$inline_176$$.backgroundColor = "black");
    let $$jscomp$inline_175$$;
    ($$jscomp$inline_175$$ = document.body.style).backgroundColor || ($$jscomp$inline_175$$.backgroundColor = "black");
    $target$jscomp$101$$.style.width = $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ + "px";
    $target$jscomp$101$$.style.height = $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ + "px";
    1 == $strategy$jscomp$1$$.$filteringMode$ && ($target$jscomp$101$$.style.$imageRendering$ = "optimizeSpeed", $target$jscomp$101$$.style.$imageRendering$ = "-moz-crisp-edges", $target$jscomp$101$$.style.$imageRendering$ = "-o-crisp-edges", $target$jscomp$101$$.style.$imageRendering$ = "-webkit-optimize-contrast", $target$jscomp$101$$.style.$imageRendering$ = "optimize-contrast", $target$jscomp$101$$.style.$imageRendering$ = "crisp-edges", $target$jscomp$101$$.style.$imageRendering$ = "pixelated");
    $$jscomp$inline_174_dpiScale$jscomp$inline_176$$ = 2 == $strategy$jscomp$1$$.$canvasResolutionScaleMode$ ? devicePixelRatio : 1;
    0 != $strategy$jscomp$1$$.$canvasResolutionScaleMode$ && ($cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ = $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$ * $$jscomp$inline_174_dpiScale$jscomp$inline_176$$ | 0, $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ = $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$ * $$jscomp$inline_174_dpiScale$jscomp$inline_176$$ | 0, $setCanvasElementSize$$($target$jscomp$101$$, $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$, 
    $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$), $target$jscomp$101$$.$GLctxObject$ && $target$jscomp$101$$.$GLctxObject$.$GLctx$.viewport(0, 0, $cssWidth$jscomp$inline_164_newWidth$jscomp$inline_177$$, $cssHeight$jscomp$inline_165_newHeight$jscomp$inline_178$$));
  }
  if ($target$jscomp$101$$.requestFullscreen) {
    $target$jscomp$101$$.requestFullscreen();
  } else if ($target$jscomp$101$$.webkitRequestFullscreen) {
    $target$jscomp$101$$.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    return $JSEvents$$.fullscreenEnabled() ? -3 : -1;
  }
  $currentFullscreenStrategy$$ = $strategy$jscomp$1$$;
  $strategy$jscomp$1$$.$canvasResizedCallback$ && $wasmTable$$.get($strategy$jscomp$1$$.$canvasResizedCallback$)(37, 0, $strategy$jscomp$1$$.$canvasResizedCallbackUserData$);
  return 0;
}, $requestPointerLock$$ = $target$jscomp$102$$ => {
  if ($target$jscomp$102$$.requestPointerLock) {
    $target$jscomp$102$$.requestPointerLock();
  } else {
    return document.body.requestPointerLock ? -3 : -1;
  }
  return 0;
}, $fillGamepadEventData$$ = ($eventStruct$$, $e$jscomp$40$$) => {
  $HEAPF64$$[$eventStruct$$ >> 3] = $e$jscomp$40$$.timestamp;
  for (var $i$jscomp$37$$ = 0; $i$jscomp$37$$ < $e$jscomp$40$$.axes.length; ++$i$jscomp$37$$) {
    $HEAPF64$$[$eventStruct$$ + 8 * $i$jscomp$37$$ + 16 >> 3] = $e$jscomp$40$$.axes[$i$jscomp$37$$];
  }
  for ($i$jscomp$37$$ = 0; $i$jscomp$37$$ < $e$jscomp$40$$.buttons.length; ++$i$jscomp$37$$) {
    $HEAPF64$$[$eventStruct$$ + 8 * $i$jscomp$37$$ + 528 >> 3] = "object" == typeof $e$jscomp$40$$.buttons[$i$jscomp$37$$] ? $e$jscomp$40$$.buttons[$i$jscomp$37$$].value : $e$jscomp$40$$.buttons[$i$jscomp$37$$];
  }
  for ($i$jscomp$37$$ = 0; $i$jscomp$37$$ < $e$jscomp$40$$.buttons.length; ++$i$jscomp$37$$) {
    $HEAP8$$[$eventStruct$$ + $i$jscomp$37$$ + 1040] = "object" == typeof $e$jscomp$40$$.buttons[$i$jscomp$37$$] ? $e$jscomp$40$$.buttons[$i$jscomp$37$$].pressed : 1 == $e$jscomp$40$$.buttons[$i$jscomp$37$$];
  }
  $HEAP8$$[$eventStruct$$ + 1104] = $e$jscomp$40$$.connected;
  $HEAP32$$[$eventStruct$$ + 1108 >> 2] = $e$jscomp$40$$.index;
  $HEAP32$$[$eventStruct$$ + 8 >> 2] = $e$jscomp$40$$.axes.length;
  $HEAP32$$[$eventStruct$$ + 12 >> 2] = $e$jscomp$40$$.buttons.length;
  $stringToUTF8$$($e$jscomp$40$$.id, $eventStruct$$ + 1112, 64);
  $stringToUTF8$$($e$jscomp$40$$.mapping, $eventStruct$$ + 1176, 64);
}, $getPreloadedImageData$$ = ($canvas$jscomp$13_path$jscomp$80$$, $w$jscomp$16$$, $h$jscomp$12$$) => {
  $canvas$jscomp$13_path$jscomp$80$$ = $PATH_FS$resolve$$($canvas$jscomp$13_path$jscomp$80$$);
  $canvas$jscomp$13_path$jscomp$80$$ = $Browser$preloadedImages$$[$canvas$jscomp$13_path$jscomp$80$$];
  if (!$canvas$jscomp$13_path$jscomp$80$$) {
    return 0;
  }
  var $image$jscomp$3$$ = $canvas$jscomp$13_path$jscomp$80$$.getContext("2d").getImageData(0, 0, $canvas$jscomp$13_path$jscomp$80$$.width, $canvas$jscomp$13_path$jscomp$80$$.height), $buf$jscomp$17$$ = $_malloc$$($canvas$jscomp$13_path$jscomp$80$$.width * $canvas$jscomp$13_path$jscomp$80$$.height * 4);
  $HEAPU8$$.set($image$jscomp$3$$.data, $buf$jscomp$17$$);
  $HEAP32$$[$w$jscomp$16$$ >> 2] = $canvas$jscomp$13_path$jscomp$80$$.width;
  $HEAP32$$[$h$jscomp$12$$ >> 2] = $canvas$jscomp$13_path$jscomp$80$$.height;
  return $buf$jscomp$17$$;
}, $tempFixedLengthArray$$ = [], $__glGetActiveAttribOrUniform$$ = ($funcName_info$jscomp$4$$, $program$jscomp$68$$, $index$jscomp$107$$, $bufSize_numBytesWrittenExclNull$$, $length$jscomp$49$$, $size$jscomp$38$$, $type$jscomp$179$$, $name$jscomp$125$$) => {
  $program$jscomp$68$$ = $GL$programs$$[$program$jscomp$68$$];
  if ($funcName_info$jscomp$4$$ = $GLctx$$[$funcName_info$jscomp$4$$]($program$jscomp$68$$, $index$jscomp$107$$)) {
    $bufSize_numBytesWrittenExclNull$$ = $name$jscomp$125$$ && $stringToUTF8$$($funcName_info$jscomp$4$$.name, $name$jscomp$125$$, $bufSize_numBytesWrittenExclNull$$), $length$jscomp$49$$ && ($HEAP32$$[$length$jscomp$49$$ >> 2] = $bufSize_numBytesWrittenExclNull$$), $size$jscomp$38$$ && ($HEAP32$$[$size$jscomp$38$$ >> 2] = $funcName_info$jscomp$4$$.size), $type$jscomp$179$$ && ($HEAP32$$[$type$jscomp$179$$ >> 2] = $funcName_info$jscomp$4$$.type);
  }
}, $writeI53ToI64$$ = ($offset$jscomp$88_ptr$jscomp$22$$, $num$jscomp$7$$) => {
  $HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$ >> 2] = $num$jscomp$7$$;
  $HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$ + 4 >> 2] = ($num$jscomp$7$$ - $HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$ >> 2]) / 4294967296;
  var $deserialized$$ = 0 <= $num$jscomp$7$$ ? $HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$ >> 2] + 4294967296 * $HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$ + 4 >> 2] : $HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$ >> 2] + 4294967296 * $HEAP32$$[$offset$jscomp$88_ptr$jscomp$22$$ + 4 >> 2];
  $offset$jscomp$88_ptr$jscomp$22$$ >>= 2;
  $deserialized$$ != $num$jscomp$7$$ && $warnOnce$$(`writeI53ToI64() out of range: serialized JS Number ${$num$jscomp$7$$} to Wasm heap as bytes lo=${$ptrToString$$($HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$])}, hi=${$ptrToString$$($HEAPU32$$[$offset$jscomp$88_ptr$jscomp$22$$ + 1])}, which deserializes back to ${$deserialized$$} instead!`);
}, $emscriptenWebGLGet$$ = ($i$jscomp$47_name_$$, $p$jscomp$7$$, $type$jscomp$182$$) => {
  if ($p$jscomp$7$$) {
    var $ret$jscomp$13$$ = void 0;
    switch($i$jscomp$47_name_$$) {
      case 36346:
        $ret$jscomp$13$$ = 1;
        break;
      case 36344:
        0 != $type$jscomp$182$$ && 1 != $type$jscomp$182$$ && ($GL$lastError$$ ||= 1280);
        return;
      case 36345:
        $ret$jscomp$13$$ = 0;
        break;
      case 34466:
        var $formats_result$jscomp$8$$ = $GLctx$$.getParameter(34467);
        $ret$jscomp$13$$ = $formats_result$jscomp$8$$ ? $formats_result$jscomp$8$$.length : 0;
    }
    if (void 0 === $ret$jscomp$13$$) {
      switch($formats_result$jscomp$8$$ = $GLctx$$.getParameter($i$jscomp$47_name_$$), typeof $formats_result$jscomp$8$$) {
        case "number":
          $ret$jscomp$13$$ = $formats_result$jscomp$8$$;
          break;
        case "boolean":
          $ret$jscomp$13$$ = $formats_result$jscomp$8$$ ? 1 : 0;
          break;
        case "string":
          $GL$lastError$$ ||= 1280;
          return;
        case "object":
          if (null === $formats_result$jscomp$8$$) {
            switch($i$jscomp$47_name_$$) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 34068:
                $ret$jscomp$13$$ = 0;
                break;
              default:
                $GL$lastError$$ ||= 1280;
                return;
            }
          } else {
            if ($formats_result$jscomp$8$$ instanceof Float32Array || $formats_result$jscomp$8$$ instanceof Uint32Array || $formats_result$jscomp$8$$ instanceof Int32Array || $formats_result$jscomp$8$$ instanceof Array) {
              for ($i$jscomp$47_name_$$ = 0; $i$jscomp$47_name_$$ < $formats_result$jscomp$8$$.length; ++$i$jscomp$47_name_$$) {
                switch($type$jscomp$182$$) {
                  case 0:
                    $HEAP32$$[$p$jscomp$7$$ + 4 * $i$jscomp$47_name_$$ >> 2] = $formats_result$jscomp$8$$[$i$jscomp$47_name_$$];
                    break;
                  case 2:
                    $HEAPF32$$[$p$jscomp$7$$ + 4 * $i$jscomp$47_name_$$ >> 2] = $formats_result$jscomp$8$$[$i$jscomp$47_name_$$];
                    break;
                  case 4:
                    $HEAP8$$[$p$jscomp$7$$ + $i$jscomp$47_name_$$] = $formats_result$jscomp$8$$[$i$jscomp$47_name_$$] ? 1 : 0;
                }
              }
              return;
            }
            try {
              $ret$jscomp$13$$ = $formats_result$jscomp$8$$.name | 0;
            } catch ($e$jscomp$41$$) {
              $GL$lastError$$ ||= 1280;
              $err$$(`GL_INVALID_ENUM in glGet${$type$jscomp$182$$}v: Unknown object returned from WebGL getParameter(${$i$jscomp$47_name_$$})! (error: ${$e$jscomp$41$$})`);
              return;
            }
          }
          break;
        default:
          $GL$lastError$$ ||= 1280;
          $err$$(`GL_INVALID_ENUM in glGet${$type$jscomp$182$$}v: Native code calling glGet${$type$jscomp$182$$}v(${$i$jscomp$47_name_$$}) and it returns ${$formats_result$jscomp$8$$} of type ${typeof $formats_result$jscomp$8$$}!`);
          return;
      }
    }
    switch($type$jscomp$182$$) {
      case 1:
        $writeI53ToI64$$($p$jscomp$7$$, $ret$jscomp$13$$);
        break;
      case 0:
        $HEAP32$$[$p$jscomp$7$$ >> 2] = $ret$jscomp$13$$;
        break;
      case 2:
        $HEAPF32$$[$p$jscomp$7$$ >> 2] = $ret$jscomp$13$$;
        break;
      case 4:
        $HEAP8$$[$p$jscomp$7$$] = $ret$jscomp$13$$ ? 1 : 0;
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $_glGetQueryObjecti64vEXT$$ = ($id$jscomp$25_param$jscomp$9$$, $pname$jscomp$28$$, $params$jscomp$2$$) => {
  if ($params$jscomp$2$$) {
    $id$jscomp$25_param$jscomp$9$$ = $GLctx$$.$disjointTimerQueryExt$.getQueryObjectEXT($GL$queries$$[$id$jscomp$25_param$jscomp$9$$], $pname$jscomp$28$$);
    var $ret$jscomp$14$$;
    "boolean" == typeof $id$jscomp$25_param$jscomp$9$$ ? $ret$jscomp$14$$ = $id$jscomp$25_param$jscomp$9$$ ? 1 : 0 : $ret$jscomp$14$$ = $id$jscomp$25_param$jscomp$9$$;
    $writeI53ToI64$$($params$jscomp$2$$, $ret$jscomp$14$$);
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $_glGetQueryObjectivEXT$$ = ($id$jscomp$26_param$jscomp$10$$, $pname$jscomp$29$$, $params$jscomp$3$$) => {
  if ($params$jscomp$3$$) {
    $id$jscomp$26_param$jscomp$10$$ = $GLctx$$.$disjointTimerQueryExt$.getQueryObjectEXT($GL$queries$$[$id$jscomp$26_param$jscomp$10$$], $pname$jscomp$29$$);
    var $ret$jscomp$15$$;
    "boolean" == typeof $id$jscomp$26_param$jscomp$10$$ ? $ret$jscomp$15$$ = $id$jscomp$26_param$jscomp$10$$ ? 1 : 0 : $ret$jscomp$15$$ = $id$jscomp$26_param$jscomp$10$$;
    $HEAP32$$[$params$jscomp$3$$ >> 2] = $ret$jscomp$15$$;
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $webglGetExtensions$$ = () => {
  var $exts$$ = $getEmscriptenSupportedExtensions$$($GLctx$$);
  return $exts$$ = $exts$$.concat($exts$$.map($e$jscomp$42$$ => "GL_" + $e$jscomp$42$$));
}, $webglGetLeftBracePos$$ = $name$jscomp$129$$ => "]" == $name$jscomp$129$$.slice(-1) && $name$jscomp$129$$.lastIndexOf("["), $webglPrepareUniformLocationsBeforeFirstUse$$ = $program$jscomp$75$$ => {
  var $uniformLocsById$$ = $program$jscomp$75$$.$uniformLocsById$, $uniformSizeAndIdsByName$$ = $program$jscomp$75$$.$uniformSizeAndIdsByName$, $i$jscomp$49$$;
  if (!$uniformLocsById$$) {
    $program$jscomp$75$$.$uniformLocsById$ = $uniformLocsById$$ = {};
    $program$jscomp$75$$.$uniformArrayNamesById$ = {};
    var $numActiveUniforms$jscomp$1$$ = $GLctx$$.getProgramParameter($program$jscomp$75$$, 35718);
    for ($i$jscomp$49$$ = 0; $i$jscomp$49$$ < $numActiveUniforms$jscomp$1$$; ++$i$jscomp$49$$) {
      var $sz$jscomp$1_u$jscomp$1$$ = $GLctx$$.getActiveUniform($program$jscomp$75$$, $i$jscomp$49$$);
      var $j_nm$$ = $sz$jscomp$1_u$jscomp$1$$.name;
      $sz$jscomp$1_u$jscomp$1$$ = $sz$jscomp$1_u$jscomp$1$$.size;
      var $arrayName_lb$$ = $webglGetLeftBracePos$$($j_nm$$);
      $arrayName_lb$$ = 0 < $arrayName_lb$$ ? $j_nm$$.slice(0, $arrayName_lb$$) : $j_nm$$;
      var $id$jscomp$27$$ = $program$jscomp$75$$.$uniformIdCounter$;
      $program$jscomp$75$$.$uniformIdCounter$ += $sz$jscomp$1_u$jscomp$1$$;
      $uniformSizeAndIdsByName$$[$arrayName_lb$$] = [$sz$jscomp$1_u$jscomp$1$$, $id$jscomp$27$$];
      for ($j_nm$$ = 0; $j_nm$$ < $sz$jscomp$1_u$jscomp$1$$; ++$j_nm$$) {
        $uniformLocsById$$[$id$jscomp$27$$] = $j_nm$$, $program$jscomp$75$$.$uniformArrayNamesById$[$id$jscomp$27$$++] = $arrayName_lb$$;
      }
    }
  }
}, $webglGetUniformLocation$$ = $location$jscomp$79$$ => {
  var $p$jscomp$13$$ = $GLctx$$.$currentProgram$;
  if ($p$jscomp$13$$) {
    var $webglLoc$$ = $p$jscomp$13$$.$uniformLocsById$[$location$jscomp$79$$];
    "number" == typeof $webglLoc$$ && ($p$jscomp$13$$.$uniformLocsById$[$location$jscomp$79$$] = $webglLoc$$ = $GLctx$$.getUniformLocation($p$jscomp$13$$, $p$jscomp$13$$.$uniformArrayNamesById$[$location$jscomp$79$$] + (0 < $webglLoc$$ ? `[${$webglLoc$$}]` : "")));
    return $webglLoc$$;
  }
  $GL$lastError$$ ||= 1282;
}, $emscriptenWebGLGetUniform$$ = ($data$jscomp$102_program$jscomp$77$$, $i$jscomp$50_location$jscomp$80$$, $params$jscomp$8$$, $type$jscomp$183$$) => {
  if ($params$jscomp$8$$) {
    if ($data$jscomp$102_program$jscomp$77$$ = $GL$programs$$[$data$jscomp$102_program$jscomp$77$$], $webglPrepareUniformLocationsBeforeFirstUse$$($data$jscomp$102_program$jscomp$77$$), $data$jscomp$102_program$jscomp$77$$ = $GLctx$$.getUniform($data$jscomp$102_program$jscomp$77$$, $webglGetUniformLocation$$($i$jscomp$50_location$jscomp$80$$)), "number" == typeof $data$jscomp$102_program$jscomp$77$$ || "boolean" == typeof $data$jscomp$102_program$jscomp$77$$) {
      switch($type$jscomp$183$$) {
        case 0:
          $HEAP32$$[$params$jscomp$8$$ >> 2] = $data$jscomp$102_program$jscomp$77$$;
          break;
        case 2:
          $HEAPF32$$[$params$jscomp$8$$ >> 2] = $data$jscomp$102_program$jscomp$77$$;
      }
    } else {
      for ($i$jscomp$50_location$jscomp$80$$ = 0; $i$jscomp$50_location$jscomp$80$$ < $data$jscomp$102_program$jscomp$77$$.length; $i$jscomp$50_location$jscomp$80$$++) {
        switch($type$jscomp$183$$) {
          case 0:
            $HEAP32$$[$params$jscomp$8$$ + 4 * $i$jscomp$50_location$jscomp$80$$ >> 2] = $data$jscomp$102_program$jscomp$77$$[$i$jscomp$50_location$jscomp$80$$];
            break;
          case 2:
            $HEAPF32$$[$params$jscomp$8$$ + 4 * $i$jscomp$50_location$jscomp$80$$ >> 2] = $data$jscomp$102_program$jscomp$77$$[$i$jscomp$50_location$jscomp$80$$];
        }
      }
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $emscriptenWebGLGetVertexAttrib$$ = ($data$jscomp$103_index$jscomp$111$$, $i$jscomp$51_pname$jscomp$36$$, $params$jscomp$11$$, $type$jscomp$184$$) => {
  if ($params$jscomp$11$$) {
    if ($data$jscomp$103_index$jscomp$111$$ = $GLctx$$.getVertexAttrib($data$jscomp$103_index$jscomp$111$$, $i$jscomp$51_pname$jscomp$36$$), 34975 == $i$jscomp$51_pname$jscomp$36$$) {
      $HEAP32$$[$params$jscomp$11$$ >> 2] = $data$jscomp$103_index$jscomp$111$$ && $data$jscomp$103_index$jscomp$111$$.name;
    } else if ("number" == typeof $data$jscomp$103_index$jscomp$111$$ || "boolean" == typeof $data$jscomp$103_index$jscomp$111$$) {
      switch($type$jscomp$184$$) {
        case 0:
          $HEAP32$$[$params$jscomp$11$$ >> 2] = $data$jscomp$103_index$jscomp$111$$;
          break;
        case 2:
          $HEAPF32$$[$params$jscomp$11$$ >> 2] = $data$jscomp$103_index$jscomp$111$$;
          break;
        case 5:
          $HEAP32$$[$params$jscomp$11$$ >> 2] = Math.fround($data$jscomp$103_index$jscomp$111$$);
      }
    } else {
      for ($i$jscomp$51_pname$jscomp$36$$ = 0; $i$jscomp$51_pname$jscomp$36$$ < $data$jscomp$103_index$jscomp$111$$.length; $i$jscomp$51_pname$jscomp$36$$++) {
        switch($type$jscomp$184$$) {
          case 0:
            $HEAP32$$[$params$jscomp$11$$ + 4 * $i$jscomp$51_pname$jscomp$36$$ >> 2] = $data$jscomp$103_index$jscomp$111$$[$i$jscomp$51_pname$jscomp$36$$];
            break;
          case 2:
            $HEAPF32$$[$params$jscomp$11$$ + 4 * $i$jscomp$51_pname$jscomp$36$$ >> 2] = $data$jscomp$103_index$jscomp$111$$[$i$jscomp$51_pname$jscomp$36$$];
            break;
          case 5:
            $HEAP32$$[$params$jscomp$11$$ + 4 * $i$jscomp$51_pname$jscomp$36$$ >> 2] = Math.fround($data$jscomp$103_index$jscomp$111$$[$i$jscomp$51_pname$jscomp$36$$]);
        }
      }
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $emscriptenWebGLGetTexPixelData$$ = ($heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$, $bytes$jscomp$3_format$jscomp$22$$, $width$jscomp$39$$, $height$jscomp$34$$, $pixels$jscomp$1$$) => {
  $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$ -= 5120;
  $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$ = 1 == $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$ ? $HEAPU8$$ : 4 == $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$ ? $HEAP32$$ : 6 == $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$ ? $HEAPF32$$ : 5 == $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$ || 28922 == $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$ ? $HEAPU32$$ : $HEAPU16$$;
  $bytes$jscomp$3_format$jscomp$22$$ = $height$jscomp$34$$ * (($GL$unpackRowLength$$ || $width$jscomp$39$$) * ({5:3, 6:4, 8:2, 29502:3, 29504:4}[$bytes$jscomp$3_format$jscomp$22$$ - 6402] || 1) * $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$.BYTES_PER_ELEMENT + $GL$unpackAlignment$$ - 1 & -$GL$unpackAlignment$$);
  return $heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$.subarray($pixels$jscomp$1$$ >>> 31 - Math.clz32($heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$.BYTES_PER_ELEMENT), $pixels$jscomp$1$$ + $bytes$jscomp$3_format$jscomp$22$$ >>> 31 - Math.clz32($heap$jscomp$2_type$jscomp$186_type$jscomp$inline_202$$.BYTES_PER_ELEMENT));
}, $miniTempWebGLFloatBuffers$$ = [], $miniTempWebGLIntBuffers$$ = [], $doRequestFullscreen$$ = ($target$jscomp$127$$, $strategy$jscomp$2$$) => {
  if (!$JSEvents$$.fullscreenEnabled()) {
    return -1;
  }
  $target$jscomp$127$$ = $findEventTarget$$($target$jscomp$127$$);
  return $target$jscomp$127$$ ? $target$jscomp$127$$.requestFullscreen || $target$jscomp$127$$.webkitRequestFullscreen ? $JSCompiler_StaticMethods_canPerformEventHandlerRequests$$() ? $JSEvents_requestFullscreen$$($target$jscomp$127$$, $strategy$jscomp$2$$) : $strategy$jscomp$2$$.$deferUntilInEventHandler$ ? ($JSCompiler_StaticMethods_deferCall$$($JSEvents_requestFullscreen$$, 1, [$target$jscomp$127$$, $strategy$jscomp$2$$]), 1) : -2 : -3 : -4;
}, $_emscripten_sample_gamepad_data$$ = () => {
  try {
    if (navigator.getGamepads) {
      return ($JSEvents$$.$lastGamepadState$ = navigator.getGamepads()) ? 0 : -1;
    }
  } catch ($e$jscomp$44$$) {
    $err$$(`navigator.getGamepads() exists, but failed to execute with exception ${$e$jscomp$44$$}. Disabling Gamepad access.`), navigator.getGamepads = null;
  }
  return -1;
}, $registerBeforeUnloadEventCallback$$ = ($userData$$, $callbackfunc$$) => {
  var $eventHandler$jscomp$1$$ = {target:$findEventTarget$$(2), $eventTypeString$:"beforeunload", $callbackfunc$:$callbackfunc$$, $handlerFunc$:($e$jscomp$45$$ = event) => {
    var $confirmationMessage$$ = $wasmTable$$.get($callbackfunc$$)(28, 0, $userData$$);
    $confirmationMessage$$ &&= $UTF8ToString$$($confirmationMessage$$);
    if ($confirmationMessage$$) {
      return $e$jscomp$45$$.preventDefault(), $e$jscomp$45$$.returnValue = $confirmationMessage$$;
    }
  }, $useCapture$:!0};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$1$$);
}, $registerFocusEventCallback$$ = ($eventHandler$jscomp$2_target$jscomp$131$$, $userData$jscomp$2$$, $useCapture$jscomp$1$$, $callbackfunc$jscomp$2$$, $eventTypeId$jscomp$1$$, $eventTypeString$jscomp$2$$) => {
  $JSEvents$$.$focusEvent$ || ($JSEvents$$.$focusEvent$ = $_malloc$$(256));
  $eventHandler$jscomp$2_target$jscomp$131$$ = {target:$findEventTarget$$($eventHandler$jscomp$2_target$jscomp$131$$), $eventTypeString$:$eventTypeString$jscomp$2$$, $callbackfunc$:$callbackfunc$jscomp$2$$, $handlerFunc$:($e$jscomp$46$$ = event) => {
    var $id$jscomp$31$$ = $e$jscomp$46$$.target.id ? $e$jscomp$46$$.target.id : "", $focusEvent$$ = $JSEvents$$.$focusEvent$;
    $stringToUTF8$$($JSCompiler_StaticMethods_getNodeNameForTarget$$($e$jscomp$46$$.target), $focusEvent$$ + 0, 128);
    $stringToUTF8$$($id$jscomp$31$$, $focusEvent$$ + 128, 128);
    $wasmTable$$.get($callbackfunc$jscomp$2$$)($eventTypeId$jscomp$1$$, $focusEvent$$, $userData$jscomp$2$$) && $e$jscomp$46$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$1$$};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$2_target$jscomp$131$$);
}, $registerFullscreenChangeEventCallback$$ = ($target$jscomp$135$$, $userData$jscomp$5$$, $useCapture$jscomp$4$$, $callbackfunc$jscomp$5$$, $eventTypeString$jscomp$3$$) => {
  $JSEvents$$.$fullscreenChangeEvent$ || ($JSEvents$$.$fullscreenChangeEvent$ = $_malloc$$(276));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$135$$, $eventTypeString$:$eventTypeString$jscomp$3$$, $callbackfunc$:$callbackfunc$jscomp$5$$, $handlerFunc$:($e$jscomp$47$$ = event) => {
    var $fullscreenChangeEvent$$ = $JSEvents$$.$fullscreenChangeEvent$, $fullscreenElement$jscomp$inline_205$$ = $getFullscreenElement$$(), $isFullscreen$jscomp$inline_206$$ = !!$fullscreenElement$jscomp$inline_205$$;
    $HEAP8$$[$fullscreenChangeEvent$$] = $isFullscreen$jscomp$inline_206$$;
    $HEAP8$$[$fullscreenChangeEvent$$ + 1] = $JSEvents$$.fullscreenEnabled();
    var $reportedElement$jscomp$inline_207$$ = $isFullscreen$jscomp$inline_206$$ ? $fullscreenElement$jscomp$inline_205$$ : $JSEvents$$.$previousFullscreenElement$, $id$jscomp$inline_208$$ = $reportedElement$jscomp$inline_207$$?.id || "";
    $stringToUTF8$$($JSCompiler_StaticMethods_getNodeNameForTarget$$($reportedElement$jscomp$inline_207$$), $fullscreenChangeEvent$$ + 2, 128);
    $stringToUTF8$$($id$jscomp$inline_208$$, $fullscreenChangeEvent$$ + 130, 128);
    $HEAP32$$[$fullscreenChangeEvent$$ + 260 >> 2] = $reportedElement$jscomp$inline_207$$ ? $reportedElement$jscomp$inline_207$$.clientWidth : 0;
    $HEAP32$$[$fullscreenChangeEvent$$ + 264 >> 2] = $reportedElement$jscomp$inline_207$$ ? $reportedElement$jscomp$inline_207$$.clientHeight : 0;
    $HEAP32$$[$fullscreenChangeEvent$$ + 268 >> 2] = screen.width;
    $HEAP32$$[$fullscreenChangeEvent$$ + 272 >> 2] = screen.height;
    $isFullscreen$jscomp$inline_206$$ && ($JSEvents$$.$previousFullscreenElement$ = $fullscreenElement$jscomp$inline_205$$);
    $wasmTable$$.get($callbackfunc$jscomp$5$$)(19, $fullscreenChangeEvent$$, $userData$jscomp$5$$) && $e$jscomp$47$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$4$$});
}, $registerGamepadEventCallback$$ = ($userData$jscomp$7$$, $eventHandler$jscomp$4_useCapture$jscomp$6$$, $callbackfunc$jscomp$7$$, $eventTypeId$jscomp$3$$, $eventTypeString$jscomp$4$$) => {
  $JSEvents$$.$gamepadEvent$ || ($JSEvents$$.$gamepadEvent$ = $_malloc$$(1240));
  $eventHandler$jscomp$4_useCapture$jscomp$6$$ = {target:$findEventTarget$$(2), $allowsDeferredCalls$:!0, $eventTypeString$:$eventTypeString$jscomp$4$$, $callbackfunc$:$callbackfunc$jscomp$7$$, $handlerFunc$:($e$jscomp$48$$ = event) => {
    var $gamepadEvent$$ = $JSEvents$$.$gamepadEvent$;
    $fillGamepadEventData$$($gamepadEvent$$, $e$jscomp$48$$.gamepad);
    $wasmTable$$.get($callbackfunc$jscomp$7$$)($eventTypeId$jscomp$3$$, $gamepadEvent$$, $userData$jscomp$7$$) && $e$jscomp$48$$.preventDefault();
  }, $useCapture$:$eventHandler$jscomp$4_useCapture$jscomp$6$$};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$4_useCapture$jscomp$6$$);
}, $registerKeyEventCallback$$ = ($eventHandler$jscomp$5_target$jscomp$138$$, $userData$jscomp$10$$, $useCapture$jscomp$9$$, $callbackfunc$jscomp$10$$, $eventTypeId$jscomp$4$$, $eventTypeString$jscomp$5$$) => {
  $JSEvents$$.$keyEvent$ || ($JSEvents$$.$keyEvent$ = $_malloc$$(160));
  $eventHandler$jscomp$5_target$jscomp$138$$ = {target:$findEventTarget$$($eventHandler$jscomp$5_target$jscomp$138$$), $eventTypeString$:$eventTypeString$jscomp$5$$, $callbackfunc$:$callbackfunc$jscomp$10$$, $handlerFunc$:$e$jscomp$49$$ => {
    $assert$$($e$jscomp$49$$);
    var $keyEventData$$ = $JSEvents$$.$keyEvent$;
    $HEAPF64$$[$keyEventData$$ >> 3] = $e$jscomp$49$$.timeStamp;
    var $idx$jscomp$5$$ = $keyEventData$$ >> 2;
    $HEAP32$$[$idx$jscomp$5$$ + 2] = $e$jscomp$49$$.location;
    $HEAP8$$[$keyEventData$$ + 12] = $e$jscomp$49$$.ctrlKey;
    $HEAP8$$[$keyEventData$$ + 13] = $e$jscomp$49$$.shiftKey;
    $HEAP8$$[$keyEventData$$ + 14] = $e$jscomp$49$$.altKey;
    $HEAP8$$[$keyEventData$$ + 15] = $e$jscomp$49$$.metaKey;
    $HEAP8$$[$keyEventData$$ + 16] = $e$jscomp$49$$.repeat;
    $HEAP32$$[$idx$jscomp$5$$ + 5] = $e$jscomp$49$$.charCode;
    $HEAP32$$[$idx$jscomp$5$$ + 6] = $e$jscomp$49$$.keyCode;
    $HEAP32$$[$idx$jscomp$5$$ + 7] = $e$jscomp$49$$.which;
    $stringToUTF8$$($e$jscomp$49$$.key || "", $keyEventData$$ + 32, 32);
    $stringToUTF8$$($e$jscomp$49$$.code || "", $keyEventData$$ + 64, 32);
    $stringToUTF8$$($e$jscomp$49$$.char || "", $keyEventData$$ + 96, 32);
    $stringToUTF8$$($e$jscomp$49$$.locale || "", $keyEventData$$ + 128, 32);
    $wasmTable$$.get($callbackfunc$jscomp$10$$)($eventTypeId$jscomp$4$$, $keyEventData$$, $userData$jscomp$10$$) && $e$jscomp$49$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$9$$};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$5_target$jscomp$138$$);
}, $fillMouseEventData$$ = ($eventStruct$jscomp$2_rect$jscomp$3$$, $e$jscomp$50$$, $target$jscomp$142$$) => {
  $assert$$(0 == $eventStruct$jscomp$2_rect$jscomp$3$$ % 4);
  $HEAPF64$$[$eventStruct$jscomp$2_rect$jscomp$3$$ >> 3] = $e$jscomp$50$$.timeStamp;
  var $idx$jscomp$6$$ = $eventStruct$jscomp$2_rect$jscomp$3$$ >> 2;
  $HEAP32$$[$idx$jscomp$6$$ + 2] = $e$jscomp$50$$.screenX;
  $HEAP32$$[$idx$jscomp$6$$ + 3] = $e$jscomp$50$$.screenY;
  $HEAP32$$[$idx$jscomp$6$$ + 4] = $e$jscomp$50$$.clientX;
  $HEAP32$$[$idx$jscomp$6$$ + 5] = $e$jscomp$50$$.clientY;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 24] = $e$jscomp$50$$.ctrlKey;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 25] = $e$jscomp$50$$.shiftKey;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 26] = $e$jscomp$50$$.altKey;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 27] = $e$jscomp$50$$.metaKey;
  $HEAP16$$[2 * $idx$jscomp$6$$ + 14] = $e$jscomp$50$$.button;
  $HEAP16$$[2 * $idx$jscomp$6$$ + 15] = $e$jscomp$50$$.buttons;
  $HEAP32$$[$idx$jscomp$6$$ + 8] = $e$jscomp$50$$.movementX;
  $HEAP32$$[$idx$jscomp$6$$ + 9] = $e$jscomp$50$$.movementY;
  $eventStruct$jscomp$2_rect$jscomp$3$$ = $getBoundingClientRect$$($target$jscomp$142$$);
  $HEAP32$$[$idx$jscomp$6$$ + 10] = $e$jscomp$50$$.clientX - ($eventStruct$jscomp$2_rect$jscomp$3$$.left | 0);
  $HEAP32$$[$idx$jscomp$6$$ + 11] = $e$jscomp$50$$.clientY - ($eventStruct$jscomp$2_rect$jscomp$3$$.top | 0);
}, $registerMouseEventCallback$$ = ($target$jscomp$143$$, $userData$jscomp$14$$, $useCapture$jscomp$13$$, $callbackfunc$jscomp$14$$, $eventTypeId$jscomp$5$$, $eventTypeString$jscomp$6$$) => {
  $JSEvents$$.$mouseEvent$ || ($JSEvents$$.$mouseEvent$ = $_malloc$$(64));
  $target$jscomp$143$$ = $findEventTarget$$($target$jscomp$143$$);
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$143$$, $allowsDeferredCalls$:"mousemove" != $eventTypeString$jscomp$6$$ && "mouseenter" != $eventTypeString$jscomp$6$$ && "mouseleave" != $eventTypeString$jscomp$6$$, $eventTypeString$:$eventTypeString$jscomp$6$$, $callbackfunc$:$callbackfunc$jscomp$14$$, $handlerFunc$:($e$jscomp$51$$ = event) => {
    $fillMouseEventData$$($JSEvents$$.$mouseEvent$, $e$jscomp$51$$, $target$jscomp$143$$);
    $wasmTable$$.get($callbackfunc$jscomp$14$$)($eventTypeId$jscomp$5$$, $JSEvents$$.$mouseEvent$, $userData$jscomp$14$$) && $e$jscomp$51$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$13$$});
}, $registerPointerlockChangeEventCallback$$ = ($target$jscomp$149$$, $userData$jscomp$20$$, $useCapture$jscomp$19$$, $callbackfunc$jscomp$20$$) => {
  $JSEvents$$.$pointerlockChangeEvent$ || ($JSEvents$$.$pointerlockChangeEvent$ = $_malloc$$(257));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$149$$, $eventTypeString$:"pointerlockchange", $callbackfunc$:$callbackfunc$jscomp$20$$, $handlerFunc$:($e$jscomp$52$$ = event) => {
    var $pointerlockChangeEvent$$ = $JSEvents$$.$pointerlockChangeEvent$, $pointerLockElement$jscomp$inline_211$$ = document.pointerLockElement;
    $HEAP8$$[$pointerlockChangeEvent$$] = !!$pointerLockElement$jscomp$inline_211$$;
    var $id$jscomp$inline_212$$ = $pointerLockElement$jscomp$inline_211$$?.id || "";
    $stringToUTF8$$($JSCompiler_StaticMethods_getNodeNameForTarget$$($pointerLockElement$jscomp$inline_211$$), $pointerlockChangeEvent$$ + 1, 128);
    $stringToUTF8$$($id$jscomp$inline_212$$, $pointerlockChangeEvent$$ + 129, 128);
    $wasmTable$$.get($callbackfunc$jscomp$20$$)(20, $pointerlockChangeEvent$$, $userData$jscomp$20$$) && $e$jscomp$52$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$19$$});
}, $registerUiEventCallback$$ = ($target$jscomp$151$$, $userData$jscomp$22$$, $useCapture$jscomp$21$$, $callbackfunc$jscomp$22$$) => {
  $JSEvents$$.$uiEvent$ || ($JSEvents$$.$uiEvent$ = $_malloc$$(36));
  $target$jscomp$151$$ = $findEventTarget$$($target$jscomp$151$$);
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$151$$, $eventTypeString$:"resize", $callbackfunc$:$callbackfunc$jscomp$22$$, $handlerFunc$:($e$jscomp$53$$ = event) => {
    if ($e$jscomp$53$$.target == $target$jscomp$151$$) {
      var $b$jscomp$6$$ = document.body;
      if ($b$jscomp$6$$) {
        var $uiEvent$$ = $JSEvents$$.$uiEvent$;
        $HEAP32$$[$uiEvent$$ >> 2] = 0;
        $HEAP32$$[$uiEvent$$ + 4 >> 2] = $b$jscomp$6$$.clientWidth;
        $HEAP32$$[$uiEvent$$ + 8 >> 2] = $b$jscomp$6$$.clientHeight;
        $HEAP32$$[$uiEvent$$ + 12 >> 2] = innerWidth;
        $HEAP32$$[$uiEvent$$ + 16 >> 2] = innerHeight;
        $HEAP32$$[$uiEvent$$ + 20 >> 2] = outerWidth;
        $HEAP32$$[$uiEvent$$ + 24 >> 2] = outerHeight;
        $HEAP32$$[$uiEvent$$ + 28 >> 2] = pageXOffset | 0;
        $HEAP32$$[$uiEvent$$ + 32 >> 2] = pageYOffset | 0;
        $wasmTable$$.get($callbackfunc$jscomp$22$$)(10, $uiEvent$$, $userData$jscomp$22$$) && $e$jscomp$53$$.preventDefault();
      }
    }
  }, $useCapture$:$useCapture$jscomp$21$$});
}, $registerTouchEventCallback$$ = ($target$jscomp$153$$, $userData$jscomp$24$$, $useCapture$jscomp$23$$, $callbackfunc$jscomp$24$$, $eventTypeId$jscomp$8$$, $eventTypeString$jscomp$9$$) => {
  $JSEvents$$.$touchEvent$ || ($JSEvents$$.$touchEvent$ = $_malloc$$(1552));
  $target$jscomp$153$$ = $findEventTarget$$($target$jscomp$153$$);
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$153$$, $allowsDeferredCalls$:"touchstart" == $eventTypeString$jscomp$9$$ || "touchend" == $eventTypeString$jscomp$9$$, $eventTypeString$:$eventTypeString$jscomp$9$$, $callbackfunc$:$callbackfunc$jscomp$24$$, $handlerFunc$:$e$jscomp$54$$ => {
    $assert$$($e$jscomp$54$$);
    var $idx32_touches$jscomp$2$$ = {}, $et_touchEvent$$ = $e$jscomp$54$$.touches;
    for (var $idx$jscomp$7_t$jscomp$2$$ of $et_touchEvent$$) {
      $idx$jscomp$7_t$jscomp$2$$.$isChanged$ = $idx$jscomp$7_t$jscomp$2$$.$onTarget$ = 0, $idx32_touches$jscomp$2$$[$idx$jscomp$7_t$jscomp$2$$.identifier] = $idx$jscomp$7_t$jscomp$2$$;
    }
    for (var $t$jscomp$3_targetRect$$ of $e$jscomp$54$$.changedTouches) {
      $t$jscomp$3_targetRect$$.$isChanged$ = 1, $idx32_touches$jscomp$2$$[$t$jscomp$3_targetRect$$.identifier] = $t$jscomp$3_targetRect$$;
    }
    for (var $numTouches_t$jscomp$4$$ of $e$jscomp$54$$.targetTouches) {
      $idx32_touches$jscomp$2$$[$numTouches_t$jscomp$4$$.identifier].$onTarget$ = 1;
    }
    $et_touchEvent$$ = $JSEvents$$.$touchEvent$;
    $HEAPF64$$[$et_touchEvent$$ >> 3] = $e$jscomp$54$$.timeStamp;
    $HEAP8$$[$et_touchEvent$$ + 12] = $e$jscomp$54$$.ctrlKey;
    $HEAP8$$[$et_touchEvent$$ + 13] = $e$jscomp$54$$.shiftKey;
    $HEAP8$$[$et_touchEvent$$ + 14] = $e$jscomp$54$$.altKey;
    $HEAP8$$[$et_touchEvent$$ + 15] = $e$jscomp$54$$.metaKey;
    $idx$jscomp$7_t$jscomp$2$$ = $et_touchEvent$$ + 16;
    $t$jscomp$3_targetRect$$ = $getBoundingClientRect$$($target$jscomp$153$$);
    $numTouches_t$jscomp$4$$ = 0;
    for (let $t$jscomp$5$$ of Object.values($idx32_touches$jscomp$2$$)) {
      if ($idx32_touches$jscomp$2$$ = $idx$jscomp$7_t$jscomp$2$$ >> 2, $HEAP32$$[$idx32_touches$jscomp$2$$] = $t$jscomp$5$$.identifier, $HEAP32$$[$idx32_touches$jscomp$2$$ + 1] = $t$jscomp$5$$.screenX, $HEAP32$$[$idx32_touches$jscomp$2$$ + 2] = $t$jscomp$5$$.screenY, $HEAP32$$[$idx32_touches$jscomp$2$$ + 3] = $t$jscomp$5$$.clientX, $HEAP32$$[$idx32_touches$jscomp$2$$ + 4] = $t$jscomp$5$$.clientY, $HEAP32$$[$idx32_touches$jscomp$2$$ + 5] = $t$jscomp$5$$.pageX, $HEAP32$$[$idx32_touches$jscomp$2$$ + 
      6] = $t$jscomp$5$$.pageY, $HEAP8$$[$idx$jscomp$7_t$jscomp$2$$ + 28] = $t$jscomp$5$$.$isChanged$, $HEAP8$$[$idx$jscomp$7_t$jscomp$2$$ + 29] = $t$jscomp$5$$.$onTarget$, $HEAP32$$[$idx32_touches$jscomp$2$$ + 8] = $t$jscomp$5$$.clientX - ($t$jscomp$3_targetRect$$.left | 0), $HEAP32$$[$idx32_touches$jscomp$2$$ + 9] = $t$jscomp$5$$.clientY - ($t$jscomp$3_targetRect$$.top | 0), $idx$jscomp$7_t$jscomp$2$$ += 48, 31 < ++$numTouches_t$jscomp$4$$) {
        break;
      }
    }
    $HEAP32$$[$et_touchEvent$$ + 8 >> 2] = $numTouches_t$jscomp$4$$;
    $wasmTable$$.get($callbackfunc$jscomp$24$$)($eventTypeId$jscomp$8$$, $et_touchEvent$$, $userData$jscomp$24$$) && $e$jscomp$54$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$23$$});
}, $registerVisibilityChangeEventCallback$$ = ($userData$jscomp$29$$, $useCapture$jscomp$28$$, $callbackfunc$jscomp$29$$) => {
  var $target$jscomp$158$$ = $specialHTMLTargets$$[1];
  $JSEvents$$.$visibilityChangeEvent$ || ($JSEvents$$.$visibilityChangeEvent$ = $_malloc$$(8));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$158$$, $eventTypeString$:"visibilitychange", $callbackfunc$:$callbackfunc$jscomp$29$$, $handlerFunc$:($e$jscomp$55$$ = event) => {
    var $visibilityChangeEvent$$ = $JSEvents$$.$visibilityChangeEvent$, $visibilityState$jscomp$inline_215$$ = ["hidden", "visible", "prerender", "unloaded"].indexOf(document.visibilityState);
    $HEAP8$$[$visibilityChangeEvent$$] = document.hidden;
    $HEAP32$$[$visibilityChangeEvent$$ + 4 >> 2] = $visibilityState$jscomp$inline_215$$;
    $wasmTable$$.get($callbackfunc$jscomp$29$$)(21, $visibilityChangeEvent$$, $userData$jscomp$29$$) && $e$jscomp$55$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$28$$});
}, $registerWheelEventCallback$$ = ($target$jscomp$159$$, $userData$jscomp$31$$, $useCapture$jscomp$30$$, $callbackfunc$jscomp$31$$) => {
  $JSEvents$$.$wheelEvent$ || ($JSEvents$$.$wheelEvent$ = $_malloc$$(96));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$159$$, $allowsDeferredCalls$:!0, $eventTypeString$:"wheel", $callbackfunc$:$callbackfunc$jscomp$31$$, $handlerFunc$:($e$jscomp$56$$ = event) => {
    var $wheelEvent$$ = $JSEvents$$.$wheelEvent$;
    $fillMouseEventData$$($wheelEvent$$, $e$jscomp$56$$, $target$jscomp$159$$);
    $HEAPF64$$[$wheelEvent$$ + 64 >> 3] = $e$jscomp$56$$.deltaX;
    $HEAPF64$$[$wheelEvent$$ + 72 >> 3] = $e$jscomp$56$$.deltaY;
    $HEAPF64$$[$wheelEvent$$ + 80 >> 3] = $e$jscomp$56$$.deltaZ;
    $HEAP32$$[$wheelEvent$$ + 88 >> 2] = $e$jscomp$56$$.deltaMode;
    $wasmTable$$.get($callbackfunc$jscomp$31$$)(9, $wheelEvent$$, $userData$jscomp$31$$) && $e$jscomp$56$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$30$$});
}, $ENV$$ = {}, $getEnvStrings$$ = () => {
  if (!$getEnvStrings$strings$$) {
    var $env$jscomp$1$$ = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.language || "C").replace("-", "_") + ".UTF-8", _:$thisProgram$$ || "./this.program"}, $x$jscomp$96$$;
    for ($x$jscomp$96$$ in $ENV$$) {
      void 0 === $ENV$$[$x$jscomp$96$$] ? delete $env$jscomp$1$$[$x$jscomp$96$$] : $env$jscomp$1$$[$x$jscomp$96$$] = $ENV$$[$x$jscomp$96$$];
    }
    var $strings$$ = [];
    for ($x$jscomp$96$$ in $env$jscomp$1$$) {
      $strings$$.push(`${$x$jscomp$96$$}=${$env$jscomp$1$$[$x$jscomp$96$$]}`);
    }
    $getEnvStrings$strings$$ = $strings$$;
  }
  return $getEnvStrings$strings$$;
}, $getEnvStrings$strings$$, $autoResumeAudioContext$$ = $ctx$jscomp$13$$ => {
  var $elements$$;
  $elements$$ ||= [document, document.getElementById("canvas")];
  ["keydown", "mousedown", "touchstart"].forEach($event$jscomp$24$$ => {
    $elements$$.forEach($element$jscomp$9$$ => {
      $element$jscomp$9$$?.addEventListener($event$jscomp$24$$, () => {
        "suspended" === $ctx$jscomp$13$$.state && $ctx$jscomp$13$$.resume();
      }, {once:!0});
    });
  });
}, $dynCall$$ = ($ptr$jscomp$27$$, $args$jscomp$14$$ = []) => {
  $assert$$(!0, "async dynCall is not supported in this mode");
  $assert$$($wasmTable$$.get($ptr$jscomp$27$$), `missing table entry in dynCall: ${$ptr$jscomp$27$$}`);
  $wasmTable$$.get($ptr$jscomp$27$$)(...$args$jscomp$14$$);
}, $getExceptionMessageCommon$$ = $ptr$jscomp$30_type_addr$$ => {
  var $sp$jscomp$2$$ = $_emscripten_stack_get_current$$(), $type$jscomp$191_type_addr_addr$$ = $__emscripten_stack_alloc$$(4), $message_addr_message_addr_addr$$ = $__emscripten_stack_alloc$$(4);
  $___get_exception_message$$($ptr$jscomp$30_type_addr$$, $type$jscomp$191_type_addr_addr$$, $message_addr_message_addr_addr$$);
  $ptr$jscomp$30_type_addr$$ = $HEAPU32$$[$type$jscomp$191_type_addr_addr$$ >> 2];
  $message_addr_message_addr_addr$$ = $HEAPU32$$[$message_addr_message_addr_addr$$ >> 2];
  $type$jscomp$191_type_addr_addr$$ = $UTF8ToString$$($ptr$jscomp$30_type_addr$$);
  $_free$$($ptr$jscomp$30_type_addr$$);
  if ($message_addr_message_addr_addr$$) {
    var $message$jscomp$45$$ = $UTF8ToString$$($message_addr_message_addr_addr$$);
    $_free$$($message_addr_message_addr_addr$$);
  }
  $__emscripten_stack_restore$$($sp$jscomp$2$$);
  return [$type$jscomp$191_type_addr_addr$$, $message$jscomp$45$$];
};
$FS$nameTable$$ = Array(4096);
$FS$mount$$($MEMFS$$, "/");
$FS$mkdir$$("/tmp");
$FS$mkdir$$("/home");
$FS$mkdir$$("/home/web_user");
(function() {
  $FS$mkdir$$("/dev");
  $FS$registerDevice$$(259, {read:() => 0, write:($stream$jscomp$40$$, $buffer$jscomp$35$$, $offset$jscomp$78$$, $length$jscomp$38$$) => $length$jscomp$38$$, $llseek$:() => 0});
  $FS$mkdev$$("/dev/null", 259);
  $TTY$register$$(1280, $TTY$default_tty_ops$$);
  $TTY$register$$(1536, $TTY$default_tty1_ops$$);
  $FS$mkdev$$("/dev/tty", 1280);
  $FS$mkdev$$("/dev/tty1", 1536);
  var $randomBuffer$$ = new Uint8Array(1024), $randomLeft$$ = 0, $randomByte$$ = () => {
    0 === $randomLeft$$ && ($randomFill$$($randomBuffer$$), $randomLeft$$ = $randomBuffer$$.byteLength);
    return $randomBuffer$$[--$randomLeft$$];
  };
  $FS$createDevice$$("/dev", "random", $randomByte$$);
  $FS$createDevice$$("/dev", "urandom", $randomByte$$);
  $FS$mkdir$$("/dev/shm");
  $FS$mkdir$$("/dev/shm/tmp");
})();
(function() {
  $FS$mkdir$$("/proc");
  var $proc_self$$ = $FS$mkdir$$("/proc/self");
  $FS$mkdir$$("/proc/self/fd");
  $FS$mount$$({$mount$() {
    var $node$jscomp$45$$ = $FS$createNode$$($proc_self$$, "fd", 16895, 73);
    $node$jscomp$45$$.$stream_ops$ = {$llseek$:$MEMFS$$.$stream_ops$.$llseek$};
    $node$jscomp$45$$.$node_ops$ = {lookup($fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$, $name$jscomp$102$$) {
      $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$ = +$name$jscomp$102$$;
      var $stream$jscomp$41$$ = $FS$getStreamChecked$$($fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$);
      $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$ = {parent:null, $mount$:{$mountpoint$:"fake"}, $node_ops$:{readlink:() => $stream$jscomp$41$$.path}, id:$fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$ + 1};
      return $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$.parent = $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$;
    }, readdir() {
      return Array.from($FS$streams$$.entries()).filter(([, $v$jscomp$1$$]) => $v$jscomp$1$$).map(([$k$jscomp$1$$]) => $k$jscomp$1$$.toString());
    }};
    return $node$jscomp$45$$;
  }}, "/proc/self/fd");
})();
$assert$$(10 === $emval_handles$$.length);
$Module$$.requestAnimationFrame = $MainLoop$requestAnimationFrame$$;
$Module$$.pauseMainLoop = $MainLoop$pause$$;
$Module$$.resumeMainLoop = function() {
  $MainLoop$currentlyRunningMainloop$$++;
  var $timingMode$$ = $MainLoop$timingMode$$, $timingValue$$ = $MainLoop$timingValue$$, $func$jscomp$13$$ = $MainLoop$func$$;
  $MainLoop$func$$ = null;
  $setMainLoop$$($func$jscomp$13$$, 0, !1, $MainLoop$arg$$, !0);
  $_emscripten_set_main_loop_timing$$($timingMode$$, $timingValue$$);
  $MainLoop$scheduler$$();
};
$Module$$.preMainLoop && $MainLoop$preMainLoop$$.push($Module$$.preMainLoop);
$Module$$.postMainLoop && $MainLoop$postMainLoop$$.push($Module$$.postMainLoop);
for (let $i$jscomp$65$$ = 0; 32 > $i$jscomp$65$$; ++$i$jscomp$65$$) {
  $tempFixedLengthArray$$.push(Array($i$jscomp$65$$));
}
for (var $miniTempWebGLFloatBuffersStorage$$ = new Float32Array(288), $i$$ = 0; 288 >= $i$$; ++$i$$) {
  $miniTempWebGLFloatBuffers$$[$i$$] = $miniTempWebGLFloatBuffersStorage$$.subarray(0, $i$$);
}
var $miniTempWebGLIntBuffersStorage$$ = new Int32Array(288);
for ($i$$ = 0; 288 >= $i$$; ++$i$$) {
  $miniTempWebGLIntBuffers$$[$i$$] = $miniTempWebGLIntBuffersStorage$$.subarray(0, $i$$);
}
$Module$$.noExitRuntime && ($noExitRuntime$$ = $Module$$.noExitRuntime);
$Module$$.preloadPlugins && ($preloadPlugins$$ = $Module$$.preloadPlugins);
$Module$$.print && ($out$$ = $Module$$.print);
$Module$$.printErr && ($err$$ = $Module$$.printErr);
$Module$$.wasmBinary && ($wasmBinary$$ = $Module$$.wasmBinary);
Object.getOwnPropertyDescriptor($Module$$, "fetchSettings") && $abort$$("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
$Module$$.arguments && ($arguments_$$ = $Module$$.arguments);
$Module$$.thisProgram && ($thisProgram$$ = $Module$$.thisProgram);
$assert$$("undefined" == typeof $Module$$.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.read, "Module.read option was removed");
$assert$$("undefined" == typeof $Module$$.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
$assert$$("undefined" == typeof $Module$$.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
$assert$$("undefined" == typeof $Module$$.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
$assert$$("undefined" == typeof $Module$$.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
$assert$$("undefined" == typeof $Module$$.ENVIRONMENT, "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
$assert$$("undefined" == typeof $Module$$.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
$assert$$("undefined" == typeof $Module$$.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
$assert$$("undefined" == typeof $Module$$.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
if ($Module$$.preInit) {
  for ("function" == typeof $Module$$.preInit && ($Module$$.preInit = [$Module$$.preInit]); 0 < $Module$$.preInit.length;) {
    $Module$$.preInit.shift()();
  }
}
$consumedModuleProp$$("preInit");
$Module$$.addRunDependency = $addRunDependency$$;
$Module$$.removeRunDependency = $removeRunDependency$$;
$Module$$.createContext = $Browser$createContext$$;
$Module$$.FS_preloadFile = async($parent$jscomp$10$$, $name$jscomp$90$$, $url$jscomp$29$$, $canRead$jscomp$1$$, $canWrite$jscomp$1$$, $dontCreateFile$$, $canOwn$jscomp$1$$, $preFinish$$) => {
  var $fullname$jscomp$1$$ = $name$jscomp$90$$ ? $PATH_FS$resolve$$($PATH$normalize$$($parent$jscomp$10$$ + "/" + $name$jscomp$90$$)) : $parent$jscomp$10$$, $dep$jscomp$1_id$jscomp$inline_220$$;
  a: {
    for (var $byteArray$jscomp$2_orig$jscomp$inline_221$$ = $dep$jscomp$1_id$jscomp$inline_220$$ = `cp ${$fullname$jscomp$1$$}`;;) {
      if (!$runDependencyTracking$$[$dep$jscomp$1_id$jscomp$inline_220$$]) {
        break a;
      }
      $dep$jscomp$1_id$jscomp$inline_220$$ = $byteArray$jscomp$2_orig$jscomp$inline_221$$ + Math.random();
    }
  }
  $addRunDependency$$($dep$jscomp$1_id$jscomp$inline_220$$);
  try {
    $byteArray$jscomp$2_orig$jscomp$inline_221$$ = $url$jscomp$29$$, "string" == typeof $url$jscomp$29$$ && ($byteArray$jscomp$2_orig$jscomp$inline_221$$ = await $asyncLoad$$($url$jscomp$29$$)), $byteArray$jscomp$2_orig$jscomp$inline_221$$ = await $FS_handledByPreloadPlugin$$($byteArray$jscomp$2_orig$jscomp$inline_221$$, $fullname$jscomp$1$$), $preFinish$$?.(), $dontCreateFile$$ || $FS$createDataFile$$($parent$jscomp$10$$, $name$jscomp$90$$, $byteArray$jscomp$2_orig$jscomp$inline_221$$, $canRead$jscomp$1$$, 
    $canWrite$jscomp$1$$, $canOwn$jscomp$1$$);
  } finally {
    $removeRunDependency$$($dep$jscomp$1_id$jscomp$inline_220$$);
  }
};
$Module$$.FS_unlink = (...$args$jscomp$16$$) => $FS$unlink$$(...$args$jscomp$16$$);
$Module$$.FS_createPath = (...$args$jscomp$15$$) => $FS$createPath$$(...$args$jscomp$15$$);
$Module$$.FS_createDevice = (...$args$jscomp$18$$) => $FS$createDevice$$(...$args$jscomp$18$$);
$Module$$.FS_createDataFile = (...$args$jscomp$10$$) => $FS$createDataFile$$(...$args$jscomp$10$$);
$Module$$.FS_createLazyFile = (...$args$jscomp$17$$) => $FS$createLazyFile$$(...$args$jscomp$17$$);
"writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 getTempRet0 withStackSave inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr getDynCaller setWasmTableEntry runtimeKeepalivePush runtimeKeepalivePop asmjsMangle HandleAllocator getNativeTypeSize addOnInit addOnPostCtor addOnPreMain STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS ccall cwrap convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction intArrayToString stringToAscii writeArrayToMemory fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback hideEverythingExceptGivenElement restoreHiddenElements softFullscreenResizeWebGLRenderTarget registerPointerlockErrorEventCallback fillBatteryEventData registerBatteryEventCallback jsStackTrace getCallstack convertPCtoSourceLocation wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags setImmediateWrapped safeRequestAnimationFrame clearImmediateWrapped registerPostMainLoop registerPreMainLoop getPromise makePromise idsToPromises makePromiseCallback Browser_asyncPrepareDataCounter isLeapYear ydayFromDate arraySum addDays getSocketFromFD getSocketAddress FS_mkdirTree _setNetworkCallback writeGLArray registerWebGlEventCallback runAndAbortIfError ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory demangle stackTrace throwInternalError whenDependentTypesAreResolved getTypeName getFunctionName getFunctionArgsName heap32VectorToArray requireRegisteredType usesDestructorStack createJsInvokerSignature checkArgCount getRequiredArgCount createJsInvoker UnboundTypeError PureVirtualError throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol createNamedFunction getBasestPointer registerInheritedInstance unregisterInheritedInstance getInheritedInstance getInheritedInstanceCount getLiveInheritedInstances enumReadValueFromPointer runDestructors craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted flushPendingDeletes setDelayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer validateThis char_0 char_9 makeLegalFunctionName count_emval_handles getStringOrSymbol emval_get_global emval_returnValue emval_lookupTypes emval_addMethodCaller".split(" ").forEach(function($sym$jscomp$4$$) {
  $hookGlobalSymbolAccess$$($sym$jscomp$4$$, () => {
    var $msg$jscomp$2$$ = `\`${$sym$jscomp$4$$}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, $librarySymbol$$ = $sym$jscomp$4$$;
    $librarySymbol$$.startsWith("_") || ($librarySymbol$$ = "$" + $sym$jscomp$4$$);
    $msg$jscomp$2$$ += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${$librarySymbol$$}')`;
    $isExportedByForceFilesystem$$($sym$jscomp$4$$) && ($msg$jscomp$2$$ += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    $warnOnce$$($msg$jscomp$2$$);
  });
  $unexportedRuntimeSymbol$$($sym$jscomp$4$$);
});
"run out err callMain abort wasmMemory wasmExports HEAPF32 HEAPF64 HEAP8 HEAPU8 HEAP16 HEAPU16 HEAP32 HEAPU32 HEAP64 HEAPU64 writeStackCookie checkStackCookie writeI53ToI64 readI53FromI64 readI53FromU64 INT53_MAX INT53_MIN bigintToI53Checked stackSave stackRestore stackAlloc setTempRet0 ptrToString zeroMemory exitJS getHeapMax growMemory ENV ERRNO_CODES strError DNS Protocols Sockets timers warnOnce readEmAsmArgsArray readEmAsmArgs runEmAsmFunction runMainThreadEmAsm jstoi_q getExecutableName autoResumeAudioContext dynCall getWasmTableEntry handleException keepRuntimeAlive callUserCallback maybeExit asyncLoad alignMemory mmapAlloc wasmTable getUniqueRunDependency noExitRuntime addOnPreRun addOnExit addOnPostRun freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString AsciiToString UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 stringToNewUTF8 stringToUTF8OnStack JSEvents registerKeyEventCallback specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle setLetterbox currentFullscreenStrategy restoreOldWindowedStyle doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback setCanvasElementSize getCanvasElementSize UNWIND_CACHE ExitStatus getEnvStrings checkWasiClock doReadv doWritev initRandomFill randomFill safeSetTimeout emSetImmediate emClearImmediate_deps emClearImmediate promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo findMatchingCatch getExceptionMessageCommon Browser requestFullscreen requestFullScreen setCanvasSize getUserMedia getPreloadedImageData__data wget MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_readFile FS FS_root FS_mounts FS_devices FS_streams FS_nextInode FS_nameTable FS_currentPath FS_initialized FS_ignorePermissions FS_filesystems FS_syncFSRequests FS_readFiles FS_lookupPath FS_getPath FS_hashName FS_hashAddNode FS_hashRemoveNode FS_lookupNode FS_createNode FS_destroyNode FS_isRoot FS_isMountpoint FS_isFile FS_isDir FS_isLink FS_isChrdev FS_isBlkdev FS_isFIFO FS_isSocket FS_flagsToPermissionString FS_nodePermissions FS_mayLookup FS_mayCreate FS_mayDelete FS_mayOpen FS_checkOpExists FS_nextfd FS_getStreamChecked FS_getStream FS_createStream FS_closeStream FS_dupStream FS_doSetAttr FS_chrdev_stream_ops FS_major FS_minor FS_makedev FS_registerDevice FS_getDevice FS_getMounts FS_syncfs FS_mount FS_unmount FS_lookup FS_mknod FS_statfs FS_statfsStream FS_statfsNode FS_create FS_mkdir FS_mkdev FS_symlink FS_rename FS_rmdir FS_readdir FS_readlink FS_stat FS_fstat FS_lstat FS_doChmod FS_chmod FS_lchmod FS_fchmod FS_doChown FS_chown FS_lchown FS_fchown FS_doTruncate FS_truncate FS_ftruncate FS_utime FS_open FS_close FS_isClosed FS_llseek FS_read FS_write FS_mmap FS_msync FS_ioctl FS_writeFile FS_cwd FS_chdir FS_createDefaultDirectories FS_createDefaultDevices FS_createSpecialDirectories FS_createStandardStreams FS_staticInit FS_init FS_quit FS_findObject FS_analyzePath FS_createFile FS_forceLoadFile FS_absolutePath FS_createFolder FS_createLink FS_joinPath FS_mmapAlloc FS_standardizePath MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers heapObjectForWebGLType toTypedArrayIndex webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw webgl_enable_EXT_polygon_offset_clamp webgl_enable_EXT_clip_control webgl_enable_WEBGL_polygon_mode GL emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform AL GLUT EGL GLEW IDBStore allocateUTF8 allocateUTF8OnStack print printErr jstoi_s InternalError BindingError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType EmValType EmValOptionalType embindRepr registeredInstances registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer assertIntegerRange readPointer finalizationRegistry detachFinalizer_deps deletionQueue delayFunction emval_freelist emval_handles emval_symbols Emval emval_methodCallers".split(" ").forEach($unexportedRuntimeSymbol$$);
$Module$$.incrementExceptionRefcount = $ptr$jscomp$28$$ => $___cxa_increment_exception_refcount$$($ptr$jscomp$28$$);
$Module$$.decrementExceptionRefcount = $ptr$jscomp$29$$ => $___cxa_decrement_exception_refcount$$($ptr$jscomp$29$$);
$Module$$.getExceptionMessage = $ptr$jscomp$31$$ => $getExceptionMessageCommon$$($ptr$jscomp$31$$);
var $ASM_CONSTS$$ = {475244:() => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), 475332:() => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0), 475422:($$0_adjustedx$$, $$1_adjustedy$$, $$2_adjustedw$$, $$3_adjustedh$$, $$4$$, $$5_iframe$$) => {
  var $height$jscomp$39_wasmCanvas$$ = document.getElementById("canvas");
  const $width$jscomp$44$$ = $height$jscomp$39_wasmCanvas$$.clientWidth;
  $height$jscomp$39_wasmCanvas$$ = $height$jscomp$39_wasmCanvas$$.clientHeight;
  $$0_adjustedx$$ = $width$jscomp$44$$ * $$0_adjustedx$$ / $$4$$;
  $$1_adjustedy$$ = $height$jscomp$39_wasmCanvas$$ * $$1_adjustedy$$ / $$5_iframe$$;
  $$2_adjustedw$$ = $width$jscomp$44$$ * $$2_adjustedw$$ / $$4$$;
  $$3_adjustedh$$ = $height$jscomp$39_wasmCanvas$$ * $$3_adjustedh$$ / $$5_iframe$$;
  $$5_iframe$$ = document.getElementById("webpage-iframe");
  $$5_iframe$$.style.left = `${$$0_adjustedx$$}px`;
  $$5_iframe$$.style.top = `${$$1_adjustedy$$}px`;
  $$5_iframe$$.style.width = `${$$2_adjustedw$$}px`;
  $$5_iframe$$.style.height = `${$$3_adjustedh$$}px`;
}, 475904:$$0$jscomp$1$$ => {
  let $iFrame$$ = document.getElementById("webpage-iframe");
  $iFrame$$.src = "";
  $iFrame$$.src = $UTF8ToString$$($$0$jscomp$1$$);
}, 476012:() => {
  let $iFrame$jscomp$1$$ = document.getElementById("webpage-iframe");
  $iFrame$jscomp$1$$.src = "";
  $iFrame$jscomp$1$$.setAttribute("hidden", "hidden");
}, 476130:() => {
  document.getElementById("webpage-iframe").removeAttribute("hidden");
}, 476224:() => {
  document.getElementById("webpage-iframe").style.pointerEvents = "none";
}, 476321:() => {
  document.getElementById("webpage-iframe").style.pointerEvents = "auto";
}, 476418:$$0$jscomp$2$$ => {
  document.getElementById("canvas").style.cursor = $UTF8ToString$$($$0$jscomp$2$$);
  document.body.style.display = "none";
  document.body.style.display = "block";
}, 476566:() => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), 476654:() => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0), 476744:() => {
  location.reload();
}, 476767:() => {
  const $hasTouch$$ = "ontouchstart" in window || 0 < navigator.maxTouchPoints, $isSmallScreen$$ = 768 >= window.innerWidth;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test((navigator.userAgent || navigator.vendor || window.opera).toLowerCase()) || $hasTouch$$ && $isSmallScreen$$;
}, 477193:$$0$jscomp$3_reply_str$jscomp$27$$ => {
  $$0$jscomp$3_reply_str$jscomp$27$$ = $UTF8ToString$$($$0$jscomp$3_reply_str$jscomp$27$$) + "\n\nAbort/Retry/Ignore/AlwaysIgnore? [ariA] :";
  $$0$jscomp$3_reply_str$jscomp$27$$ = window.prompt($$0$jscomp$3_reply_str$jscomp$27$$, "i");
  null === $$0$jscomp$3_reply_str$jscomp$27$$ && ($$0$jscomp$3_reply_str$jscomp$27$$ = "i");
  return 1 === $$0$jscomp$3_reply_str$jscomp$27$$.length ? $$0$jscomp$3_reply_str$jscomp$27$$.charCodeAt(0) : -1;
}, 477408:() => "undefined" !== typeof AudioContext || "undefined" !== typeof webkitAudioContext ? !0 : !1, 477555:() => "undefined" !== typeof navigator.mediaDevices && "undefined" !== typeof navigator.mediaDevices.getUserMedia || "undefined" !== typeof navigator.webkitGetUserMedia ? !0 : !1, 477789:$$0$jscomp$4$$ => {
  "undefined" === typeof $Module$$.SDL2 && ($Module$$.SDL2 = {});
  var $SDL2$$ = $Module$$.SDL2;
  $$0$jscomp$4$$ ? $SDL2$$.capture = {} : $SDL2$$.audio = {};
  $SDL2$$.$audioContext$ || ("undefined" !== typeof AudioContext ? $SDL2$$.$audioContext$ = new AudioContext() : "undefined" !== typeof webkitAudioContext && ($SDL2$$.$audioContext$ = new webkitAudioContext()), $SDL2$$.$audioContext$ && "undefined" === typeof navigator.userActivation && $autoResumeAudioContext$$($SDL2$$.$audioContext$));
  return void 0 === $SDL2$$.$audioContext$ ? -1 : 0;
}, 478341:() => $Module$$.SDL2.$audioContext$.sampleRate, 478409:($$0$jscomp$5$$, $$1$jscomp$1$$, $$2$jscomp$1$$, $$3$jscomp$1$$) => {
  function $no_microphone$$() {
  }
  function $have_microphone$$($stream$jscomp$64$$) {
    void 0 !== $SDL2$jscomp$2$$.capture.$silenceTimer$ && (clearInterval($SDL2$jscomp$2$$.capture.$silenceTimer$), $SDL2$jscomp$2$$.capture.$silenceTimer$ = void 0, $SDL2$jscomp$2$$.capture.$silenceBuffer$ = void 0);
    $SDL2$jscomp$2$$.capture.$mediaStreamNode$ = $SDL2$jscomp$2$$.$audioContext$.createMediaStreamSource($stream$jscomp$64$$);
    $SDL2$jscomp$2$$.capture.$scriptProcessorNode$ = $SDL2$jscomp$2$$.$audioContext$.createScriptProcessor($$1$jscomp$1$$, $$0$jscomp$5$$, 1);
    $SDL2$jscomp$2$$.capture.$scriptProcessorNode$.onaudioprocess = function($audioProcessingEvent$$) {
      void 0 !== $SDL2$jscomp$2$$ && void 0 !== $SDL2$jscomp$2$$.capture && ($audioProcessingEvent$$.outputBuffer.getChannelData(0).fill(0.0), $SDL2$jscomp$2$$.capture.$currentCaptureBuffer$ = $audioProcessingEvent$$.inputBuffer, $dynCall$$($$2$jscomp$1$$, [$$3$jscomp$1$$]));
    };
    $SDL2$jscomp$2$$.capture.$mediaStreamNode$.connect($SDL2$jscomp$2$$.capture.$scriptProcessorNode$);
    $SDL2$jscomp$2$$.capture.$scriptProcessorNode$.connect($SDL2$jscomp$2$$.$audioContext$.destination);
    $SDL2$jscomp$2$$.capture.stream = $stream$jscomp$64$$;
  }
  var $SDL2$jscomp$2$$ = $Module$$.SDL2;
  $SDL2$jscomp$2$$.capture.$silenceBuffer$ = $SDL2$jscomp$2$$.$audioContext$.createBuffer($$0$jscomp$5$$, $$1$jscomp$1$$, $SDL2$jscomp$2$$.$audioContext$.sampleRate);
  $SDL2$jscomp$2$$.capture.$silenceBuffer$.getChannelData(0).fill(0.0);
  $SDL2$jscomp$2$$.capture.$silenceTimer$ = setInterval(function() {
    $SDL2$jscomp$2$$.capture.$currentCaptureBuffer$ = $SDL2$jscomp$2$$.capture.$silenceBuffer$;
    $dynCall$$($$2$jscomp$1$$, [$$3$jscomp$1$$]);
  }, $$1$jscomp$1$$ / $SDL2$jscomp$2$$.$audioContext$.sampleRate * 1000);
  void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({audio:!0, video:!1}).then($have_microphone$$).catch($no_microphone$$) : void 0 !== navigator.webkitGetUserMedia && navigator.webkitGetUserMedia({audio:!0, video:!1}, $have_microphone$$, $no_microphone$$);
}, 480102:($$0$jscomp$6$$, $$1$jscomp$2$$, $$2$jscomp$2$$, $$3$jscomp$2$$) => {
  var $SDL2$jscomp$3$$ = $Module$$.SDL2;
  $SDL2$jscomp$3$$.audio.$scriptProcessorNode$ = $SDL2$jscomp$3$$.$audioContext$.createScriptProcessor($$1$jscomp$2$$, 0, $$0$jscomp$6$$);
  $SDL2$jscomp$3$$.audio.$scriptProcessorNode$.onaudioprocess = function($e$jscomp$61$$) {
    void 0 !== $SDL2$jscomp$3$$ && void 0 !== $SDL2$jscomp$3$$.audio && (void 0 !== $SDL2$jscomp$3$$.audio.$silenceTimer$ && (clearInterval($SDL2$jscomp$3$$.audio.$silenceTimer$), $SDL2$jscomp$3$$.audio.$silenceTimer$ = void 0, $SDL2$jscomp$3$$.audio.$silenceBuffer$ = void 0), $SDL2$jscomp$3$$.audio.$currentOutputBuffer$ = $e$jscomp$61$$.outputBuffer, $dynCall$$($$2$jscomp$2$$, [$$3$jscomp$2$$]));
  };
  $SDL2$jscomp$3$$.audio.$scriptProcessorNode$.connect($SDL2$jscomp$3$$.$audioContext$.destination);
  "suspended" === $SDL2$jscomp$3$$.$audioContext$.state && ($SDL2$jscomp$3$$.audio.$silenceBuffer$ = $SDL2$jscomp$3$$.$audioContext$.createBuffer($$0$jscomp$6$$, $$1$jscomp$2$$, $SDL2$jscomp$3$$.$audioContext$.sampleRate), $SDL2$jscomp$3$$.audio.$silenceBuffer$.getChannelData(0).fill(0.0), $SDL2$jscomp$3$$.audio.$silenceTimer$ = setInterval(function() {
    "undefined" !== typeof navigator.userActivation && navigator.userActivation.hasBeenActive && $SDL2$jscomp$3$$.$audioContext$.resume();
    $SDL2$jscomp$3$$.audio.$currentOutputBuffer$ = $SDL2$jscomp$3$$.audio.$silenceBuffer$;
    $dynCall$$($$2$jscomp$2$$, [$$3$jscomp$2$$]);
    $SDL2$jscomp$3$$.audio.$currentOutputBuffer$ = void 0;
  }, $$1$jscomp$2$$ / $SDL2$jscomp$3$$.$audioContext$.sampleRate * 1000));
}, 481277:($$0$jscomp$7$$, $$1$jscomp$3$$) => {
  for (var $SDL2$jscomp$4$$ = $Module$$.SDL2, $numChannels$$ = $SDL2$jscomp$4$$.capture.$currentCaptureBuffer$.numberOfChannels, $c$jscomp$2$$ = 0; $c$jscomp$2$$ < $numChannels$$; ++$c$jscomp$2$$) {
    var $channelData$$ = $SDL2$jscomp$4$$.capture.$currentCaptureBuffer$.getChannelData($c$jscomp$2$$);
    if ($channelData$$.length != $$1$jscomp$3$$) {
      throw "Web Audio capture buffer length mismatch! Destination size: " + $channelData$$.length + " samples vs expected " + $$1$jscomp$3$$ + " samples!";
    }
    if (1 == $numChannels$$) {
      for (var $j$jscomp$1$$ = 0; $j$jscomp$1$$ < $$1$jscomp$3$$; ++$j$jscomp$1$$) {
        $setValue$$($$0$jscomp$7$$ + 4 * $j$jscomp$1$$, $channelData$$[$j$jscomp$1$$]);
      }
    } else {
      for ($j$jscomp$1$$ = 0; $j$jscomp$1$$ < $$1$jscomp$3$$; ++$j$jscomp$1$$) {
        $setValue$$($$0$jscomp$7$$ + 4 * ($j$jscomp$1$$ * $numChannels$$ + $c$jscomp$2$$), $channelData$$[$j$jscomp$1$$]);
      }
    }
  }
}, 481882:($$0$jscomp$8_buf$jscomp$18$$, $$1$jscomp$4$$) => {
  var $SDL2$jscomp$5$$ = $Module$$.SDL2;
  $$0$jscomp$8_buf$jscomp$18$$ >>>= 2;
  for (var $numChannels$jscomp$1$$ = $SDL2$jscomp$5$$.audio.$currentOutputBuffer$.numberOfChannels, $c$jscomp$3$$ = 0; $c$jscomp$3$$ < $numChannels$jscomp$1$$; ++$c$jscomp$3$$) {
    var $channelData$jscomp$1$$ = $SDL2$jscomp$5$$.audio.$currentOutputBuffer$.getChannelData($c$jscomp$3$$);
    if ($channelData$jscomp$1$$.length != $$1$jscomp$4$$) {
      throw "Web Audio output buffer length mismatch! Destination size: " + $channelData$jscomp$1$$.length + " samples vs expected " + $$1$jscomp$4$$ + " samples!";
    }
    for (var $j$jscomp$2$$ = 0; $j$jscomp$2$$ < $$1$jscomp$4$$; ++$j$jscomp$2$$) {
      $channelData$jscomp$1$$[$j$jscomp$2$$] = $HEAPF32$$[$$0$jscomp$8_buf$jscomp$18$$ + ($j$jscomp$2$$ * $numChannels$jscomp$1$$ + $c$jscomp$3$$)];
    }
  }
}, 482371:$$0$jscomp$9_tracks$$ => {
  var $SDL2$jscomp$6$$ = $Module$$.SDL2;
  if ($$0$jscomp$9_tracks$$) {
    void 0 !== $SDL2$jscomp$6$$.capture.$silenceTimer$ && clearInterval($SDL2$jscomp$6$$.capture.$silenceTimer$);
    if (void 0 !== $SDL2$jscomp$6$$.capture.stream) {
      $$0$jscomp$9_tracks$$ = $SDL2$jscomp$6$$.capture.stream.getAudioTracks();
      for (var $i$jscomp$66$$ = 0; $i$jscomp$66$$ < $$0$jscomp$9_tracks$$.length; $i$jscomp$66$$++) {
        $SDL2$jscomp$6$$.capture.stream.removeTrack($$0$jscomp$9_tracks$$[$i$jscomp$66$$]);
      }
    }
    void 0 !== $SDL2$jscomp$6$$.capture.$scriptProcessorNode$ && ($SDL2$jscomp$6$$.capture.$scriptProcessorNode$.onaudioprocess = function() {
    }, $SDL2$jscomp$6$$.capture.$scriptProcessorNode$.disconnect());
    void 0 !== $SDL2$jscomp$6$$.capture.$mediaStreamNode$ && $SDL2$jscomp$6$$.capture.$mediaStreamNode$.disconnect();
    $SDL2$jscomp$6$$.capture = void 0;
  } else {
    void 0 != $SDL2$jscomp$6$$.audio.$scriptProcessorNode$ && $SDL2$jscomp$6$$.audio.$scriptProcessorNode$.disconnect(), void 0 !== $SDL2$jscomp$6$$.audio.$silenceTimer$ && clearInterval($SDL2$jscomp$6$$.audio.$silenceTimer$), $SDL2$jscomp$6$$.audio = void 0;
  }
  void 0 !== $SDL2$jscomp$6$$.$audioContext$ && void 0 === $SDL2$jscomp$6$$.audio && void 0 === $SDL2$jscomp$6$$.capture && ($SDL2$jscomp$6$$.$audioContext$.close(), $SDL2$jscomp$6$$.$audioContext$ = void 0);
}, 483377:($$0$jscomp$10_data$jscomp$104_data32_data8$$, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$, $$2$jscomp$3_num$jscomp$10$$) => {
  $Module$$.SDL2 || ($Module$$.SDL2 = {});
  var $SDL2$jscomp$7$$ = $Module$$.SDL2;
  $SDL2$jscomp$7$$.$ctxCanvas$ !== $Module$$.canvas && ($SDL2$jscomp$7$$.$ctx$ = $Browser$createContext$$($Module$$.canvas, !1, !0), $SDL2$jscomp$7$$.$ctxCanvas$ = $Module$$.canvas);
  if ($SDL2$jscomp$7$$.w !== $$0$jscomp$10_data$jscomp$104_data32_data8$$ || $SDL2$jscomp$7$$.$h$ !== $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ || $SDL2$jscomp$7$$.$imageCtx$ !== $SDL2$jscomp$7$$.$ctx$) {
    $SDL2$jscomp$7$$.image = $SDL2$jscomp$7$$.$ctx$.createImageData($$0$jscomp$10_data$jscomp$104_data32_data8$$, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$), $SDL2$jscomp$7$$.w = $$0$jscomp$10_data$jscomp$104_data32_data8$$, $SDL2$jscomp$7$$.$h$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$, $SDL2$jscomp$7$$.$imageCtx$ = $SDL2$jscomp$7$$.$ctx$;
  }
  $$0$jscomp$10_data$jscomp$104_data32_data8$$ = $SDL2$jscomp$7$$.image.data;
  $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$2$jscomp$3_num$jscomp$10$$ / 4;
  var $dst$jscomp$2_j$jscomp$3$$ = 0;
  if ("undefined" !== typeof CanvasPixelArray && $$0$jscomp$10_data$jscomp$104_data32_data8$$ instanceof CanvasPixelArray) {
    for ($$2$jscomp$3_num$jscomp$10$$ = $$0$jscomp$10_data$jscomp$104_data32_data8$$.length; $dst$jscomp$2_j$jscomp$3$$ < $$2$jscomp$3_num$jscomp$10$$;) {
      var $val$jscomp$9$$ = $HEAP32$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$];
      $$0$jscomp$10_data$jscomp$104_data32_data8$$[$dst$jscomp$2_j$jscomp$3$$] = $val$jscomp$9$$ & 255;
      $$0$jscomp$10_data$jscomp$104_data32_data8$$[$dst$jscomp$2_j$jscomp$3$$ + 1] = $val$jscomp$9$$ >> 8 & 255;
      $$0$jscomp$10_data$jscomp$104_data32_data8$$[$dst$jscomp$2_j$jscomp$3$$ + 2] = $val$jscomp$9$$ >> 16 & 255;
      $$0$jscomp$10_data$jscomp$104_data32_data8$$[$dst$jscomp$2_j$jscomp$3$$ + 3] = 255;
      $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$++;
      $dst$jscomp$2_j$jscomp$3$$ += 4;
    }
  } else {
    if ($SDL2$jscomp$7$$.$data32Data$ !== $$0$jscomp$10_data$jscomp$104_data32_data8$$ && ($SDL2$jscomp$7$$.$data32$ = new Int32Array($$0$jscomp$10_data$jscomp$104_data32_data8$$.buffer), $SDL2$jscomp$7$$.$data8$ = new Uint8Array($$0$jscomp$10_data$jscomp$104_data32_data8$$.buffer), $SDL2$jscomp$7$$.$data32Data$ = $$0$jscomp$10_data$jscomp$104_data32_data8$$), $$0$jscomp$10_data$jscomp$104_data32_data8$$ = $SDL2$jscomp$7$$.$data32$, $$2$jscomp$3_num$jscomp$10$$ = $$0$jscomp$10_data$jscomp$104_data32_data8$$.length, 
    $$0$jscomp$10_data$jscomp$104_data32_data8$$.set($HEAP32$$.subarray($$1$jscomp$5_i$jscomp$67_src$jscomp$5$$, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + $$2$jscomp$3_num$jscomp$10$$)), $$0$jscomp$10_data$jscomp$104_data32_data8$$ = $SDL2$jscomp$7$$.$data8$, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = 3, $dst$jscomp$2_j$jscomp$3$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 * $$2$jscomp$3_num$jscomp$10$$, 0 == $$2$jscomp$3_num$jscomp$10$$ % 8) {
      for (; $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ < $dst$jscomp$2_j$jscomp$3$$;) {
        $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0, $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0, $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = 
        $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0, $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0, $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0, $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 
        255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0, $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0, $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0;
      }
    } else {
      for (; $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ < $dst$jscomp$2_j$jscomp$3$$;) {
        $$0$jscomp$10_data$jscomp$104_data32_data8$$[$$1$jscomp$5_i$jscomp$67_src$jscomp$5$$] = 255, $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ = $$1$jscomp$5_i$jscomp$67_src$jscomp$5$$ + 4 | 0;
      }
    }
  }
  $SDL2$jscomp$7$$.$ctx$.putImageData($SDL2$jscomp$7$$.image, 0, 0);
}, 484843:($$0$jscomp$11_image$jscomp$4$$, $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$, $$2$jscomp$4_url$jscomp$34$$, $$3$jscomp$3_urlBuf$$, $$4$jscomp$1_src$jscomp$6$$) => {
  var $canvas$jscomp$14$$ = document.createElement("canvas");
  $canvas$jscomp$14$$.width = $$0$jscomp$11_image$jscomp$4$$;
  $canvas$jscomp$14$$.height = $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$;
  var $ctx$jscomp$14$$ = $canvas$jscomp$14$$.getContext("2d");
  $$0$jscomp$11_image$jscomp$4$$ = $ctx$jscomp$14$$.createImageData($$0$jscomp$11_image$jscomp$4$$, $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$);
  $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$ = $$0$jscomp$11_image$jscomp$4$$.data;
  $$4$jscomp$1_src$jscomp$6$$ /= 4;
  var $dst$jscomp$3$$ = 0, $num$jscomp$11$$;
  if ("undefined" !== typeof CanvasPixelArray && $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$ instanceof CanvasPixelArray) {
    for ($num$jscomp$11$$ = $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$.length; $dst$jscomp$3$$ < $num$jscomp$11$$;) {
      var $val$jscomp$10$$ = $HEAP32$$[$$4$jscomp$1_src$jscomp$6$$];
      $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$[$dst$jscomp$3$$] = $val$jscomp$10$$ & 255;
      $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$[$dst$jscomp$3$$ + 1] = $val$jscomp$10$$ >> 8 & 255;
      $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$[$dst$jscomp$3$$ + 2] = $val$jscomp$10$$ >> 16 & 255;
      $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$[$dst$jscomp$3$$ + 3] = $val$jscomp$10$$ >> 24 & 255;
      $$4$jscomp$1_src$jscomp$6$$++;
      $dst$jscomp$3$$ += 4;
    }
  } else {
    $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$ = new Int32Array($$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$.buffer), $num$jscomp$11$$ = $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$.length, $$1$jscomp$6_data$jscomp$105_data32$jscomp$1$$.set($HEAP32$$.subarray($$4$jscomp$1_src$jscomp$6$$, $$4$jscomp$1_src$jscomp$6$$ + $num$jscomp$11$$));
  }
  $ctx$jscomp$14$$.putImageData($$0$jscomp$11_image$jscomp$4$$, 0, 0);
  $$2$jscomp$4_url$jscomp$34$$ = 0 === $$2$jscomp$4_url$jscomp$34$$ && 0 === $$3$jscomp$3_urlBuf$$ ? "url(" + $canvas$jscomp$14$$.toDataURL() + "), auto" : "url(" + $canvas$jscomp$14$$.toDataURL() + ") " + $$2$jscomp$4_url$jscomp$34$$ + " " + $$3$jscomp$3_urlBuf$$ + ", auto";
  $$3$jscomp$3_urlBuf$$ = $_malloc$$($$2$jscomp$4_url$jscomp$34$$.length + 1);
  $stringToUTF8$$($$2$jscomp$4_url$jscomp$34$$, $$3$jscomp$3_urlBuf$$, $$2$jscomp$4_url$jscomp$34$$.length + 1);
  return $$3$jscomp$3_urlBuf$$;
}, 485831:$$0$jscomp$12$$ => {
  $Module$$.canvas && ($Module$$.canvas.style.cursor = $UTF8ToString$$($$0$jscomp$12$$));
}, 485914:() => {
  $Module$$.canvas && ($Module$$.canvas.style.cursor = "none");
}, 485983:() => window.innerWidth, 486013:() => window.innerHeight}, $_main$$ = $Module$$._main = $makeInvalidEarlyAccess$$("_main"), $_free$$ = $makeInvalidEarlyAccess$$("_free"), $_malloc$$ = $makeInvalidEarlyAccess$$("_malloc"), $_strerror$$ = $makeInvalidEarlyAccess$$("_strerror"), $_fflush$$ = $makeInvalidEarlyAccess$$("_fflush"), $_fileno$$ = $makeInvalidEarlyAccess$$("_fileno"), $_emscripten_stack_get_end$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_get_end"), $_emscripten_builtin_memalign$$ = 
$makeInvalidEarlyAccess$$("_emscripten_builtin_memalign"), $_setThrew$$ = $makeInvalidEarlyAccess$$("_setThrew"), $__emscripten_tempret_set$$ = $makeInvalidEarlyAccess$$("__emscripten_tempret_set"), $_emscripten_stack_init$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_init"), $__emscripten_stack_restore$$ = $makeInvalidEarlyAccess$$("__emscripten_stack_restore"), $__emscripten_stack_alloc$$ = $makeInvalidEarlyAccess$$("__emscripten_stack_alloc"), $_emscripten_stack_get_current$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_get_current"), 
$___cxa_increment_exception_refcount$$ = $makeInvalidEarlyAccess$$("___cxa_increment_exception_refcount"), $___cxa_decrement_exception_refcount$$ = $makeInvalidEarlyAccess$$("___cxa_decrement_exception_refcount"), $___get_exception_message$$ = $makeInvalidEarlyAccess$$("___get_exception_message"), $___cxa_can_catch$$ = $makeInvalidEarlyAccess$$("___cxa_can_catch"), $___cxa_get_exception_ptr$$ = $makeInvalidEarlyAccess$$("___cxa_get_exception_ptr"), $wasmImports$$ = {__assert_fail:($condition$jscomp$3$$, 
$filename$jscomp$18$$, $line$jscomp$7$$, $func$jscomp$8$$) => $abort$$(`Assertion failed: ${$UTF8ToString$$($condition$jscomp$3$$)}, at: ` + [$filename$jscomp$18$$ ? $UTF8ToString$$($filename$jscomp$18$$) : "unknown filename", $line$jscomp$7$$, $func$jscomp$8$$ ? $UTF8ToString$$($func$jscomp$8$$) : "unknown function"]), __cxa_begin_catch:$ptr$jscomp$4$$ => {
  var $info$jscomp$1$$ = new $ExceptionInfo$$($ptr$jscomp$4$$);
  0 == $HEAP8$$[$info$jscomp$1$$.$ptr$ + 12] && ($HEAP8$$[$info$jscomp$1$$.$ptr$ + 12] = 1, $uncaughtExceptionCount$$--);
  $HEAP8$$[$info$jscomp$1$$.$ptr$ + 13] = 0;
  $exceptionCaught$$.push($info$jscomp$1$$);
  $___cxa_increment_exception_refcount$$($ptr$jscomp$4$$);
  return $___cxa_get_exception_ptr$$($ptr$jscomp$4$$);
}, __cxa_find_matching_catch_2:() => $findMatchingCatch$$([]), __cxa_find_matching_catch_3:$arg0$$ => $findMatchingCatch$$([$arg0$$]), __cxa_throw:($ptr$jscomp$5$$, $type$jscomp$174$$, $destructor$jscomp$2$$) => {
  var $JSCompiler_StaticMethods_init$self$jscomp$inline_229$$ = new $ExceptionInfo$$($ptr$jscomp$5$$);
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_229$$.$ptr$ + 16 >> 2] = 0;
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_229$$.$ptr$ + 4 >> 2] = $type$jscomp$174$$;
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_229$$.$ptr$ + 8 >> 2] = $destructor$jscomp$2$$;
  $exceptionLast$$ = new $CppException$$($ptr$jscomp$5$$);
  $uncaughtExceptionCount$$++;
  throw $exceptionLast$$;
}, __resumeException:$ptr$jscomp$6$$ => {
  $exceptionLast$$ ||= new $CppException$$($ptr$jscomp$6$$);
  throw $exceptionLast$$;
}, __syscall_fcntl64:function($fd$jscomp$33$$, $cmd$jscomp$1$$, $varargs$$) {
  $SYSCALLS$varargs$$ = $varargs$$;
  try {
    var $stream$jscomp$53$$ = $FS$getStreamChecked$$($fd$jscomp$33$$);
    switch($cmd$jscomp$1$$) {
      case 0:
        var $arg$jscomp$11$$ = $syscallGetVarargI$$();
        if (0 > $arg$jscomp$11$$) {
          break;
        }
        for (; $FS$streams$$[$arg$jscomp$11$$];) {
          $arg$jscomp$11$$++;
        }
        return $FS$dupStream$$($stream$jscomp$53$$, $arg$jscomp$11$$).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return $stream$jscomp$53$$.flags;
      case 4:
        return $arg$jscomp$11$$ = $syscallGetVarargI$$(), $stream$jscomp$53$$.flags |= $arg$jscomp$11$$, 0;
      case 12:
        return $arg$jscomp$11$$ = $syscallGetVarargI$$(), $HEAP16$$[$arg$jscomp$11$$ + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch ($e$jscomp$27$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$27$$.name) {
      throw $e$jscomp$27$$;
    }
    return -$e$jscomp$27$$.$errno$;
  }
}, __syscall_fstat64:function($arg$jscomp$inline_237_fd$jscomp$34$$, $buf$jscomp$12$$) {
  try {
    var $stream$jscomp$inline_234$$ = $FS$getStreamChecked$$($arg$jscomp$inline_237_fd$jscomp$34$$), $node$jscomp$inline_235$$ = $stream$jscomp$inline_234$$.node, $getattr$jscomp$inline_236$$ = $stream$jscomp$inline_234$$.$stream_ops$.$getattr$;
    $arg$jscomp$inline_237_fd$jscomp$34$$ = $getattr$jscomp$inline_236$$ ? $stream$jscomp$inline_234$$ : $node$jscomp$inline_235$$;
    $getattr$jscomp$inline_236$$ ??= $node$jscomp$inline_235$$.$node_ops$.$getattr$;
    $FS$checkOpExists$$($getattr$jscomp$inline_236$$);
    var $JSCompiler_inline_result$jscomp$7$$ = $getattr$jscomp$inline_236$$($arg$jscomp$inline_237_fd$jscomp$34$$);
    return $SYSCALLS$writeStat$$($buf$jscomp$12$$, $JSCompiler_inline_result$jscomp$7$$);
  } catch ($e$jscomp$28$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$28$$.name) {
      throw $e$jscomp$28$$;
    }
    return -$e$jscomp$28$$.$errno$;
  }
}, __syscall_ioctl:function($fd$jscomp$35$$, $JSCompiler_object_inline_c_cc_444_c_cc_op$jscomp$1$$, $varargs$jscomp$1$$) {
  $SYSCALLS$varargs$$ = $varargs$jscomp$1$$;
  try {
    var $stream$jscomp$54$$ = $FS$getStreamChecked$$($fd$jscomp$35$$);
    switch($JSCompiler_object_inline_c_cc_444_c_cc_op$jscomp$1$$) {
      case 21509:
        return $stream$jscomp$54$$.tty ? 0 : -59;
      case 21505:
        if (!$stream$jscomp$54$$.tty) {
          return -59;
        }
        if ($stream$jscomp$54$$.tty.$ops$.$ioctl_tcgets$) {
          $JSCompiler_object_inline_c_cc_444_c_cc_op$jscomp$1$$ = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var $arg$jscomp$inline_241_argp$$ = $syscallGetVarargI$$();
          $HEAP32$$[$arg$jscomp$inline_241_argp$$ >> 2] = 25856;
          $HEAP32$$[$arg$jscomp$inline_241_argp$$ + 4 >> 2] = 5;
          $HEAP32$$[$arg$jscomp$inline_241_argp$$ + 8 >> 2] = 191;
          $HEAP32$$[$arg$jscomp$inline_241_argp$$ + 12 >> 2] = 35387;
          for (var $i$jscomp$21_winsize$$ = 0; 32 > $i$jscomp$21_winsize$$; $i$jscomp$21_winsize$$++) {
            $HEAP8$$[$arg$jscomp$inline_241_argp$$ + $i$jscomp$21_winsize$$ + 17] = $JSCompiler_object_inline_c_cc_444_c_cc_op$jscomp$1$$[$i$jscomp$21_winsize$$] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return $stream$jscomp$54$$.tty ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!$stream$jscomp$54$$.tty) {
          return -59;
        }
        if ($stream$jscomp$54$$.tty.$ops$.$ioctl_tcsets$) {
          for ($arg$jscomp$inline_241_argp$$ = $syscallGetVarargI$$(), $JSCompiler_object_inline_c_cc_444_c_cc_op$jscomp$1$$ = [], $i$jscomp$21_winsize$$ = 0; 32 > $i$jscomp$21_winsize$$; $i$jscomp$21_winsize$$++) {
            $JSCompiler_object_inline_c_cc_444_c_cc_op$jscomp$1$$.push($HEAP8$$[$arg$jscomp$inline_241_argp$$ + $i$jscomp$21_winsize$$ + 17]);
          }
        }
        return 0;
      case 21519:
        if (!$stream$jscomp$54$$.tty) {
          return -59;
        }
        $arg$jscomp$inline_241_argp$$ = $syscallGetVarargI$$();
        return $HEAP32$$[$arg$jscomp$inline_241_argp$$ >> 2] = 0;
      case 21520:
        return $stream$jscomp$54$$.tty ? -28 : -59;
      case 21537:
      case 21531:
        $arg$jscomp$inline_241_argp$$ = $syscallGetVarargI$$();
        if (!$stream$jscomp$54$$.$stream_ops$.$ioctl$) {
          throw new $FS$ErrnoError$$(59);
        }
        return $stream$jscomp$54$$.$stream_ops$.$ioctl$($stream$jscomp$54$$, $JSCompiler_object_inline_c_cc_444_c_cc_op$jscomp$1$$, $arg$jscomp$inline_241_argp$$);
      case 21523:
        if (!$stream$jscomp$54$$.tty) {
          return -59;
        }
        $stream$jscomp$54$$.tty.$ops$.$ioctl_tiocgwinsz$ && ($i$jscomp$21_winsize$$ = [24, 80], $arg$jscomp$inline_241_argp$$ = $syscallGetVarargI$$(), $HEAP16$$[$arg$jscomp$inline_241_argp$$ >> 1] = $i$jscomp$21_winsize$$[0], $HEAP16$$[$arg$jscomp$inline_241_argp$$ + 2 >> 1] = $i$jscomp$21_winsize$$[1]);
        return 0;
      case 21524:
        return $stream$jscomp$54$$.tty ? 0 : -59;
      case 21515:
        return $stream$jscomp$54$$.tty ? 0 : -59;
      default:
        return -28;
    }
  } catch ($e$jscomp$29$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$29$$.name) {
      throw $e$jscomp$29$$;
    }
    return -$e$jscomp$29$$.$errno$;
  }
}, __syscall_lstat64:function($path$jscomp$76$$, $buf$jscomp$13$$) {
  try {
    return $path$jscomp$76$$ = $UTF8ToString$$($path$jscomp$76$$), $SYSCALLS$writeStat$$($buf$jscomp$13$$, $FS$stat$$($path$jscomp$76$$, !0));
  } catch ($e$jscomp$30$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$30$$.name) {
      throw $e$jscomp$30$$;
    }
    return -$e$jscomp$30$$.$errno$;
  }
}, __syscall_newfstatat:function($dirfd$jscomp$1$$, $path$jscomp$77$$, $buf$jscomp$14$$, $flags$jscomp$16$$) {
  try {
    $path$jscomp$77$$ = $UTF8ToString$$($path$jscomp$77$$);
    var $nofollow$$ = $flags$jscomp$16$$ & 256, $allowEmpty$jscomp$1$$ = $flags$jscomp$16$$ & 4096;
    $flags$jscomp$16$$ &= -6401;
    $assert$$(!$flags$jscomp$16$$, `unknown flags in __syscall_newfstatat: ${$flags$jscomp$16$$}`);
    $path$jscomp$77$$ = $SYSCALLS$calculateAt$$($dirfd$jscomp$1$$, $path$jscomp$77$$, $allowEmpty$jscomp$1$$);
    return $SYSCALLS$writeStat$$($buf$jscomp$14$$, $nofollow$$ ? $FS$stat$$($path$jscomp$77$$, !0) : $FS$stat$$($path$jscomp$77$$));
  } catch ($e$jscomp$31$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$31$$.name) {
      throw $e$jscomp$31$$;
    }
    return -$e$jscomp$31$$.$errno$;
  }
}, __syscall_openat:function($dirfd$jscomp$2$$, $path$jscomp$78$$, $flags$jscomp$17$$, $varargs$jscomp$2$$) {
  $SYSCALLS$varargs$$ = $varargs$jscomp$2$$;
  try {
    $path$jscomp$78$$ = $UTF8ToString$$($path$jscomp$78$$);
    $path$jscomp$78$$ = $SYSCALLS$calculateAt$$($dirfd$jscomp$2$$, $path$jscomp$78$$);
    var $mode$jscomp$52$$ = $varargs$jscomp$2$$ ? $syscallGetVarargI$$() : 0;
    return $FS$open$$($path$jscomp$78$$, $flags$jscomp$17$$, $mode$jscomp$52$$).fd;
  } catch ($e$jscomp$32$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$32$$.name) {
      throw $e$jscomp$32$$;
    }
    return -$e$jscomp$32$$.$errno$;
  }
}, __syscall_stat64:function($path$jscomp$79$$, $buf$jscomp$15$$) {
  try {
    return $path$jscomp$79$$ = $UTF8ToString$$($path$jscomp$79$$), $SYSCALLS$writeStat$$($buf$jscomp$15$$, $FS$stat$$($path$jscomp$79$$));
  } catch ($e$jscomp$33$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$33$$.name) {
      throw $e$jscomp$33$$;
    }
    return -$e$jscomp$33$$.$errno$;
  }
}, _abort_js:() => $abort$$("native code called abort()"), _embind_register_bigint:($primitiveType$$, $name$jscomp$109$$, $size$jscomp$28$$, $minRange$jscomp$1$$, $maxRange$jscomp$1$$) => {
  $name$jscomp$109$$ = $AsciiToString$$($name$jscomp$109$$);
  const $isUnsignedType$$ = 0n === $minRange$jscomp$1$$;
  let $fromWireType$$ = $value$jscomp$113$$ => $value$jscomp$113$$;
  if ($isUnsignedType$$) {
    const $bitSize$$ = 8 * $size$jscomp$28$$;
    $fromWireType$$ = $value$jscomp$114$$ => BigInt.asUintN($bitSize$$, $value$jscomp$114$$);
    $maxRange$jscomp$1$$ = $fromWireType$$($maxRange$jscomp$1$$);
  }
  $registerType$$($primitiveType$$, {name:$name$jscomp$109$$, $fromWireType$:$fromWireType$$, $toWireType$:($destructors$$, $value$jscomp$115$$) => {
    if ("number" == typeof $value$jscomp$115$$) {
      $value$jscomp$115$$ = BigInt($value$jscomp$115$$);
    } else if ("bigint" != typeof $value$jscomp$115$$) {
      throw new TypeError(`Cannot convert "${$embindRepr$$($value$jscomp$115$$)}" to ${this.name}`);
    }
    $assertIntegerRange$$($name$jscomp$109$$, $value$jscomp$115$$, $minRange$jscomp$1$$, $maxRange$jscomp$1$$);
    return $value$jscomp$115$$;
  }, $readValueFromPointer$:$integerReadValueFromPointer$$($name$jscomp$109$$, $size$jscomp$28$$, !$isUnsignedType$$), $destructorFunction$:null});
}, _embind_register_bool:($rawType$jscomp$2$$, $name$jscomp$110$$, $trueValue$$, $falseValue$$) => {
  $name$jscomp$110$$ = $AsciiToString$$($name$jscomp$110$$);
  $registerType$$($rawType$jscomp$2$$, {name:$name$jscomp$110$$, $fromWireType$:function($wt$$) {
    return !!$wt$$;
  }, $toWireType$:function($destructors$jscomp$1$$, $o$$) {
    return $o$$ ? $trueValue$$ : $falseValue$$;
  }, $readValueFromPointer$:function($pointer$jscomp$8$$) {
    return this.$fromWireType$($HEAPU8$$[$pointer$jscomp$8$$]);
  }, $destructorFunction$:null});
}, _embind_register_emval:$rawType$jscomp$3$$ => $registerType$$($rawType$jscomp$3$$, $EmValType$$), _embind_register_float:($rawType$jscomp$4$$, $name$jscomp$112$$, $size$jscomp$29$$) => {
  $name$jscomp$112$$ = $AsciiToString$$($name$jscomp$112$$);
  $registerType$$($rawType$jscomp$4$$, {name:$name$jscomp$112$$, $fromWireType$:$value$jscomp$118$$ => $value$jscomp$118$$, $toWireType$:($destructors$jscomp$3$$, $value$jscomp$119$$) => {
    if ("number" != typeof $value$jscomp$119$$ && "boolean" != typeof $value$jscomp$119$$) {
      throw new TypeError(`Cannot convert ${$embindRepr$$($value$jscomp$119$$)} to ${this.name}`);
    }
    return $value$jscomp$119$$;
  }, $readValueFromPointer$:$floatReadValueFromPointer$$($name$jscomp$112$$, $size$jscomp$29$$), $destructorFunction$:null});
}, _embind_register_integer:($primitiveType$jscomp$1$$, $name$jscomp$113$$, $size$jscomp$30$$, $minRange$jscomp$2$$, $maxRange$jscomp$2$$) => {
  $name$jscomp$113$$ = $AsciiToString$$($name$jscomp$113$$);
  let $fromWireType$jscomp$1$$ = $value$jscomp$120$$ => $value$jscomp$120$$;
  if (0 === $minRange$jscomp$2$$) {
    var $bitshift$$ = 32 - 8 * $size$jscomp$30$$;
    $fromWireType$jscomp$1$$ = $value$jscomp$121$$ => $value$jscomp$121$$ << $bitshift$$ >>> $bitshift$$;
    $maxRange$jscomp$2$$ = $fromWireType$jscomp$1$$($maxRange$jscomp$2$$);
  }
  $registerType$$($primitiveType$jscomp$1$$, {name:$name$jscomp$113$$, $fromWireType$:$fromWireType$jscomp$1$$, $toWireType$:($destructors$jscomp$4$$, $value$jscomp$122$$) => {
    if ("number" != typeof $value$jscomp$122$$ && "boolean" != typeof $value$jscomp$122$$) {
      throw new TypeError(`Cannot convert "${$embindRepr$$($value$jscomp$122$$)}" to ${$name$jscomp$113$$}`);
    }
    $assertIntegerRange$$($name$jscomp$113$$, $value$jscomp$122$$, $minRange$jscomp$2$$, $maxRange$jscomp$2$$);
    return $value$jscomp$122$$;
  }, $readValueFromPointer$:$integerReadValueFromPointer$$($name$jscomp$113$$, $size$jscomp$30$$, 0 !== $minRange$jscomp$2$$), $destructorFunction$:null});
}, _embind_register_memory_view:($rawType$jscomp$5$$, $dataTypeIndex$$, $name$jscomp$114$$) => {
  function $decodeMemoryView$$($handle$jscomp$16$$) {
    return new $TA$$($HEAP8$$.buffer, $HEAPU32$$[$handle$jscomp$16$$ + 4 >> 2], $HEAPU32$$[$handle$jscomp$16$$ >> 2]);
  }
  var $TA$$ = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][$dataTypeIndex$$];
  $name$jscomp$114$$ = $AsciiToString$$($name$jscomp$114$$);
  $registerType$$($rawType$jscomp$5$$, {name:$name$jscomp$114$$, $fromWireType$:$decodeMemoryView$$, $readValueFromPointer$:$decodeMemoryView$$}, {$ignoreDuplicateRegistrations$:!0});
}, _embind_register_std_string:($rawType$jscomp$6$$, $name$jscomp$115$$) => {
  $name$jscomp$115$$ = $AsciiToString$$($name$jscomp$115$$);
  $registerType$$($rawType$jscomp$6$$, {name:$name$jscomp$115$$, $fromWireType$($value$jscomp$123$$) {
    var $str$jscomp$15$$ = $UTF8ToString$$($value$jscomp$123$$ + 4, $HEAPU32$$[$value$jscomp$123$$ >> 2], !0);
    $_free$$($value$jscomp$123$$);
    return $str$jscomp$15$$;
  }, $toWireType$($destructors$jscomp$5$$, $value$jscomp$124$$) {
    $value$jscomp$124$$ instanceof ArrayBuffer && ($value$jscomp$124$$ = new Uint8Array($value$jscomp$124$$));
    var $valueIsOfTypeString$$ = "string" == typeof $value$jscomp$124$$;
    if (!($valueIsOfTypeString$$ || ArrayBuffer.isView($value$jscomp$124$$) && 1 == $value$jscomp$124$$.BYTES_PER_ELEMENT)) {
      throw new $BindingError$$("Cannot pass non-string to std::string");
    }
    var $length$jscomp$45$$ = $valueIsOfTypeString$$ ? $lengthBytesUTF8$$($value$jscomp$124$$) : $value$jscomp$124$$.length;
    var $base$jscomp$3$$ = $_malloc$$(4 + $length$jscomp$45$$ + 1), $ptr$jscomp$13$$ = $base$jscomp$3$$ + 4;
    $HEAPU32$$[$base$jscomp$3$$ >> 2] = $length$jscomp$45$$;
    $valueIsOfTypeString$$ ? $stringToUTF8$$($value$jscomp$124$$, $ptr$jscomp$13$$, $length$jscomp$45$$ + 1) : $HEAPU8$$.set($value$jscomp$124$$, $ptr$jscomp$13$$);
    null !== $destructors$jscomp$5$$ && $destructors$jscomp$5$$.push($_free$$, $base$jscomp$3$$);
    return $base$jscomp$3$$;
  }, $readValueFromPointer$:$readPointer$$, $destructorFunction$($ptr$jscomp$14$$) {
    $_free$$($ptr$jscomp$14$$);
  }});
}, _embind_register_std_wstring:($rawType$jscomp$7$$, $charSize$$, $name$jscomp$116$$) => {
  $name$jscomp$116$$ = $AsciiToString$$($name$jscomp$116$$);
  if (2 === $charSize$$) {
    var $decodeString$$ = $UTF16ToString$$;
    var $encodeString$$ = $stringToUTF16$$;
    var $lengthBytesUTF$$ = $lengthBytesUTF16$$;
  } else {
    $assert$$(4 === $charSize$$, "only 2-byte and 4-byte strings are currently supported"), $decodeString$$ = $UTF32ToString$$, $encodeString$$ = $stringToUTF32$$, $lengthBytesUTF$$ = $lengthBytesUTF32$$;
  }
  $registerType$$($rawType$jscomp$7$$, {name:$name$jscomp$116$$, $fromWireType$:$value$jscomp$125$$ => {
    var $str$jscomp$22$$ = $decodeString$$($value$jscomp$125$$ + 4, $HEAPU32$$[$value$jscomp$125$$ >> 2] * $charSize$$, !0);
    $_free$$($value$jscomp$125$$);
    return $str$jscomp$22$$;
  }, $toWireType$:($destructors$jscomp$6$$, $value$jscomp$126$$) => {
    if ("string" != typeof $value$jscomp$126$$) {
      throw new $BindingError$$(`Cannot pass non-string to C++ string type ${$name$jscomp$116$$}`);
    }
    var $length$jscomp$47$$ = $lengthBytesUTF$$($value$jscomp$126$$), $ptr$jscomp$17$$ = $_malloc$$(4 + $length$jscomp$47$$ + $charSize$$);
    $HEAPU32$$[$ptr$jscomp$17$$ >> 2] = $length$jscomp$47$$ / $charSize$$;
    $encodeString$$($value$jscomp$126$$, $ptr$jscomp$17$$ + 4, $length$jscomp$47$$ + $charSize$$);
    null !== $destructors$jscomp$6$$ && $destructors$jscomp$6$$.push($_free$$, $ptr$jscomp$17$$);
    return $ptr$jscomp$17$$;
  }, $readValueFromPointer$:$readPointer$$, $destructorFunction$($ptr$jscomp$18$$) {
    $_free$$($ptr$jscomp$18$$);
  }});
}, _embind_register_void:($rawType$jscomp$8$$, $name$jscomp$117$$) => {
  $name$jscomp$117$$ = $AsciiToString$$($name$jscomp$117$$);
  $registerType$$($rawType$jscomp$8$$, {$isVoid$:!0, name:$name$jscomp$117$$, $fromWireType$:() => {
  }, $toWireType$:() => {
  }});
}, _emscripten_throw_longjmp:() => {
  throw new $EmscriptenSjLj$$();
}, _mmap_js:function($len$jscomp$11$$, $prot$jscomp$3$$, $flags$jscomp$18$$, $fd$jscomp$36_position$jscomp$inline_249$$, $offset$jscomp$85$$, $allocated$jscomp$1$$, $addr$jscomp$1$$) {
  $offset$jscomp$85$$ = -9007199254740992 > $offset$jscomp$85$$ || 9007199254740992 < $offset$jscomp$85$$ ? NaN : Number($offset$jscomp$85$$);
  try {
    $assert$$(!isNaN($offset$jscomp$85$$));
    var $stream$jscomp$inline_247$$ = $FS$getStreamChecked$$($fd$jscomp$36_position$jscomp$inline_249$$);
    $fd$jscomp$36_position$jscomp$inline_249$$ = $offset$jscomp$85$$;
    if (0 !== ($prot$jscomp$3$$ & 2) && 0 === ($flags$jscomp$18$$ & 2) && 2 !== ($stream$jscomp$inline_247$$.flags & 2097155)) {
      throw new $FS$ErrnoError$$(2);
    }
    if (1 === ($stream$jscomp$inline_247$$.flags & 2097155)) {
      throw new $FS$ErrnoError$$(2);
    }
    if (!$stream$jscomp$inline_247$$.$stream_ops$.$mmap$) {
      throw new $FS$ErrnoError$$(43);
    }
    if (!$len$jscomp$11$$) {
      throw new $FS$ErrnoError$$(28);
    }
    var $res$$ = $stream$jscomp$inline_247$$.$stream_ops$.$mmap$($stream$jscomp$inline_247$$, $len$jscomp$11$$, $fd$jscomp$36_position$jscomp$inline_249$$, $prot$jscomp$3$$, $flags$jscomp$18$$);
    var $ptr$jscomp$19$$ = $res$$.$ptr$;
    $HEAP32$$[$allocated$jscomp$1$$ >> 2] = $res$$.$allocated$;
    $HEAPU32$$[$addr$jscomp$1$$ >> 2] = $ptr$jscomp$19$$;
    return 0;
  } catch ($e$jscomp$34$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$34$$.name) {
      throw $e$jscomp$34$$;
    }
    return -$e$jscomp$34$$.$errno$;
  }
}, _munmap_js:function($addr$jscomp$2$$, $len$jscomp$12$$, $offset$jscomp$inline_257_prot$jscomp$4$$, $flags$jscomp$19$$, $fd$jscomp$37$$, $offset$jscomp$86$$) {
  $offset$jscomp$86$$ = -9007199254740992 > $offset$jscomp$86$$ || 9007199254740992 < $offset$jscomp$86$$ ? NaN : Number($offset$jscomp$86$$);
  try {
    var $stream$jscomp$56$$ = $FS$getStreamChecked$$($fd$jscomp$37$$);
    if ($offset$jscomp$inline_257_prot$jscomp$4$$ & 2) {
      $offset$jscomp$inline_257_prot$jscomp$4$$ = $offset$jscomp$86$$;
      if (32768 !== ($stream$jscomp$56$$.node.mode & 61440)) {
        throw new $FS$ErrnoError$$(43);
      }
      if (!($flags$jscomp$19$$ & 2)) {
        var $buffer$jscomp$inline_258$$ = $HEAPU8$$.slice($addr$jscomp$2$$, $addr$jscomp$2$$ + $len$jscomp$12$$);
        $assert$$(0 <= $offset$jscomp$inline_257_prot$jscomp$4$$);
        $stream$jscomp$56$$.$stream_ops$.$msync$ && $stream$jscomp$56$$.$stream_ops$.$msync$($stream$jscomp$56$$, $buffer$jscomp$inline_258$$, $offset$jscomp$inline_257_prot$jscomp$4$$, $len$jscomp$12$$, $flags$jscomp$19$$);
      }
    }
  } catch ($e$jscomp$35$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$35$$.name) {
      throw $e$jscomp$35$$;
    }
    return -$e$jscomp$35$$.$errno$;
  }
}, _tzset_js:($timezone_winterName$$, $daylight_extractZone_summerName$$, $std_name$$, $dst_name$$) => {
  var $currentYear_summerOffset$$ = (new Date()).getFullYear(), $winterOffset$$ = (new Date($currentYear_summerOffset$$, 0, 1)).getTimezoneOffset();
  $currentYear_summerOffset$$ = (new Date($currentYear_summerOffset$$, 6, 1)).getTimezoneOffset();
  $HEAPU32$$[$timezone_winterName$$ >> 2] = 60 * Math.max($winterOffset$$, $currentYear_summerOffset$$);
  $HEAP32$$[$daylight_extractZone_summerName$$ >> 2] = Number($winterOffset$$ != $currentYear_summerOffset$$);
  $daylight_extractZone_summerName$$ = $timezoneOffset$$ => {
    var $absOffset$$ = Math.abs($timezoneOffset$$);
    return `UTC${0 <= $timezoneOffset$$ ? "-" : "+"}${String(Math.floor($absOffset$$ / 60)).padStart(2, "0")}${String($absOffset$$ % 60).padStart(2, "0")}`;
  };
  $timezone_winterName$$ = $daylight_extractZone_summerName$$($winterOffset$$);
  $daylight_extractZone_summerName$$ = $daylight_extractZone_summerName$$($currentYear_summerOffset$$);
  $assert$$($timezone_winterName$$);
  $assert$$($daylight_extractZone_summerName$$);
  $assert$$(16 >= $lengthBytesUTF8$$($timezone_winterName$$), `timezone name truncated to fit in TZNAME_MAX (${$timezone_winterName$$})`);
  $assert$$(16 >= $lengthBytesUTF8$$($daylight_extractZone_summerName$$), `timezone name truncated to fit in TZNAME_MAX (${$daylight_extractZone_summerName$$})`);
  $currentYear_summerOffset$$ < $winterOffset$$ ? ($stringToUTF8$$($timezone_winterName$$, $std_name$$, 17), $stringToUTF8$$($daylight_extractZone_summerName$$, $dst_name$$, 17)) : ($stringToUTF8$$($timezone_winterName$$, $dst_name$$, 17), $stringToUTF8$$($daylight_extractZone_summerName$$, $std_name$$, 17));
}, clock_time_get:function($clk_id$$, $ignored_precision$$, $ptime$$) {
  if (!(0 <= $clk_id$$ && 3 >= $clk_id$$)) {
    return 28;
  }
  $HEAP64$$[$ptime$$ >> 3] = BigInt(Math.round(1E6 * (0 === $clk_id$$ ? Date.now() : performance.now())));
  return 0;
}, eglBindAPI:$api$$ => {
  if (12448 == $api$$) {
    return $EGL$errorCode$$ = 12288, 1;
  }
  $EGL$errorCode$$ = 12300;
  return 0;
}, eglChooseConfig:($display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$, $attribList$jscomp$inline_265_attrib_list$$, $JSCompiler_inline_result$jscomp$20_configs$$, $config_size$jscomp$1$$, $numConfigs$jscomp$1$$) => {
  if (62000 != $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
    $EGL$errorCode$$ = 12296, $JSCompiler_inline_result$jscomp$20_configs$$ = 0;
  } else {
    if ($attribList$jscomp$inline_265_attrib_list$$) {
      for (;;) {
        $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$ = $HEAP32$$[$attribList$jscomp$inline_265_attrib_list$$ >> 2];
        if (12321 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
          $EGL$contextAttributes$$.alpha = 0 < $HEAP32$$[$attribList$jscomp$inline_265_attrib_list$$ + 4 >> 2];
        } else if (12325 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
          $EGL$contextAttributes$$.depth = 0 < $HEAP32$$[$attribList$jscomp$inline_265_attrib_list$$ + 4 >> 2];
        } else if (12326 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
          $EGL$contextAttributes$$.stencil = 0 < $HEAP32$$[$attribList$jscomp$inline_265_attrib_list$$ + 4 >> 2];
        } else if (12337 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
          $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$ = $HEAP32$$[$attribList$jscomp$inline_265_attrib_list$$ + 4 >> 2], $EGL$contextAttributes$$.antialias = 0 < $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$;
        } else if (12338 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
          $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$ = $HEAP32$$[$attribList$jscomp$inline_265_attrib_list$$ + 4 >> 2], $EGL$contextAttributes$$.antialias = 1 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$;
        } else if (12544 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
          $EGL$contextAttributes$$.$lowLatency$ = 12547 != $HEAP32$$[$attribList$jscomp$inline_265_attrib_list$$ + 4 >> 2];
        } else if (12344 == $display$jscomp$1_param$jscomp$inline_269_samples$jscomp$inline_270$$) {
          break;
        }
        $attribList$jscomp$inline_265_attrib_list$$ += 8;
      }
    }
    $JSCompiler_inline_result$jscomp$20_configs$$ && $config_size$jscomp$1$$ || $numConfigs$jscomp$1$$ ? ($numConfigs$jscomp$1$$ && ($HEAP32$$[$numConfigs$jscomp$1$$ >> 2] = 1), $JSCompiler_inline_result$jscomp$20_configs$$ && 0 < $config_size$jscomp$1$$ && ($HEAPU32$$[$JSCompiler_inline_result$jscomp$20_configs$$ >> 2] = 62002), $EGL$errorCode$$ = 12288, $JSCompiler_inline_result$jscomp$20_configs$$ = 1) : ($EGL$errorCode$$ = 12300, $JSCompiler_inline_result$jscomp$20_configs$$ = 0);
  }
  return $JSCompiler_inline_result$jscomp$20_configs$$;
}, eglCreateContext:($display$jscomp$2_glesContextVersion$$, $config$jscomp$7_param$jscomp$8$$, $hmm$$, $contextAttribs$$) => {
  if (62000 != $display$jscomp$2_glesContextVersion$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  for ($display$jscomp$2_glesContextVersion$$ = 1;;) {
    $config$jscomp$7_param$jscomp$8$$ = $HEAP32$$[$contextAttribs$$ >> 2];
    if (12440 == $config$jscomp$7_param$jscomp$8$$) {
      $display$jscomp$2_glesContextVersion$$ = $HEAP32$$[$contextAttribs$$ + 4 >> 2];
    } else if (12344 == $config$jscomp$7_param$jscomp$8$$) {
      break;
    } else {
      return $EGL$errorCode$$ = 12292, 0;
    }
    $contextAttribs$$ += 8;
  }
  if (2 != $display$jscomp$2_glesContextVersion$$) {
    return $EGL$errorCode$$ = 12293, 0;
  }
  $EGL$contextAttributes$$.$majorVersion$ = $display$jscomp$2_glesContextVersion$$ - 1;
  $EGL$contextAttributes$$.$minorVersion$ = 0;
  $EGL$context$$ = $GL$createContext$$($Module$$.canvas, $EGL$contextAttributes$$);
  if (0 != $EGL$context$$) {
    return $EGL$errorCode$$ = 12288, $GL$makeContextCurrent$$($EGL$context$$), $Browser$moduleContextCreatedCallbacks$$.forEach($callback$jscomp$134$$ => $callback$jscomp$134$$()), $GL$makeContextCurrent$$(null), 62004;
  }
  $EGL$errorCode$$ = 12297;
  return 0;
}, eglCreateWindowSurface:($display$jscomp$3$$, $config$jscomp$8$$) => {
  if (62000 != $display$jscomp$3$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  if (62002 != $config$jscomp$8$$) {
    return $EGL$errorCode$$ = 12293, 0;
  }
  $EGL$errorCode$$ = 12288;
  return 62006;
}, eglDestroyContext:($contextHandle$jscomp$inline_292_display$jscomp$4$$, $context$jscomp$8$$) => {
  if (62000 != $contextHandle$jscomp$inline_292_display$jscomp$4$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  if (62004 != $context$jscomp$8$$) {
    return $EGL$errorCode$$ = 12294, 0;
  }
  $contextHandle$jscomp$inline_292_display$jscomp$4$$ = $EGL$context$$;
  $GL$currentContext$$ === $GL$contexts$$[$contextHandle$jscomp$inline_292_display$jscomp$4$$] && ($GL$currentContext$$ = null);
  "object" == typeof $JSEvents$$ && $JSEvents$$.$removeAllHandlersOnTarget$($GL$contexts$$[$contextHandle$jscomp$inline_292_display$jscomp$4$$].$GLctx$.canvas);
  $GL$contexts$$[$contextHandle$jscomp$inline_292_display$jscomp$4$$]?.$GLctx$.canvas && ($GL$contexts$$[$contextHandle$jscomp$inline_292_display$jscomp$4$$].$GLctx$.canvas.$GLctxObject$ = void 0);
  $GL$contexts$$[$contextHandle$jscomp$inline_292_display$jscomp$4$$] = null;
  $EGL$errorCode$$ = 12288;
  $EGL$currentContext$$ == $context$jscomp$8$$ && ($EGL$currentContext$$ = 0);
  return 1;
}, eglDestroySurface:($display$jscomp$5$$, $surface$$) => {
  if (62000 != $display$jscomp$5$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  if (62006 != $surface$$) {
    return $EGL$errorCode$$ = 12301, 1;
  }
  $EGL$currentReadSurface$$ == $surface$$ && ($EGL$currentReadSurface$$ = 0);
  $EGL$currentDrawSurface$$ == $surface$$ && ($EGL$currentDrawSurface$$ = 0);
  $EGL$errorCode$$ = 12288;
  return 1;
}, eglGetConfigAttrib:($display$jscomp$6$$, $config$jscomp$9$$, $attribute$jscomp$2$$, $value$jscomp$127$$) => {
  if (62000 != $display$jscomp$6$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  if (62002 != $config$jscomp$9$$) {
    return $EGL$errorCode$$ = 12293, 0;
  }
  if (!$value$jscomp$127$$) {
    return $EGL$errorCode$$ = 12300, 0;
  }
  $EGL$errorCode$$ = 12288;
  switch($attribute$jscomp$2$$) {
    case 12320:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = $EGL$contextAttributes$$.alpha ? 32 : 24, 1;
    case 12321:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = $EGL$contextAttributes$$.alpha ? 8 : 0, 1;
    case 12322:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 8, 1;
    case 12323:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 8, 1;
    case 12324:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 8, 1;
    case 12325:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = $EGL$contextAttributes$$.depth ? 24 : 0, 1;
    case 12326:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = $EGL$contextAttributes$$.stencil ? 8 : 0, 1;
    case 12327:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 12344, 1;
    case 12328:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 62002, 1;
    case 12329:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 0, 1;
    case 12330:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 4096, 1;
    case 12331:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 16777216, 1;
    case 12332:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 4096, 1;
    case 12333:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 0, 1;
    case 12334:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 0, 1;
    case 12335:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 12344, 1;
    case 12337:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = $EGL$contextAttributes$$.antialias ? 4 : 0, 1;
    case 12338:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = $EGL$contextAttributes$$.antialias ? 1 : 0, 1;
    case 12339:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 4, 1;
    case 12340:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 12344, 1;
    case 12341:
    case 12342:
    case 12343:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = -1, 1;
    case 12345:
    case 12346:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 0, 1;
    case 12347:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 0, 1;
    case 12348:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 1;
    case 12349:
    case 12350:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 0, 1;
    case 12351:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 12430, 1;
    case 12352:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 4, 1;
    case 12354:
      return $HEAP32$$[$value$jscomp$127$$ >> 2] = 0, 1;
    default:
      return $EGL$errorCode$$ = 12292, 0;
  }
}, eglGetDisplay:$nativeDisplayType$$ => {
  $EGL$errorCode$$ = 12288;
  return 0 != $nativeDisplayType$$ && 1 != $nativeDisplayType$$ ? 0 : 62000;
}, eglGetError:() => $EGL$errorCode$$, eglInitialize:($display$jscomp$7$$, $majorVersion$$, $minorVersion$$) => {
  if (62000 != $display$jscomp$7$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  $majorVersion$$ && ($HEAP32$$[$majorVersion$$ >> 2] = 1);
  $minorVersion$$ && ($HEAP32$$[$minorVersion$$ >> 2] = 4);
  $EGL$defaultDisplayInitialized$$ = !0;
  $EGL$errorCode$$ = 12288;
  return 1;
}, eglMakeCurrent:($display$jscomp$8$$, $draw$$, $read$$, $context$jscomp$9$$) => {
  if (62000 != $display$jscomp$8$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  if (0 != $context$jscomp$9$$ && 62004 != $context$jscomp$9$$) {
    return $EGL$errorCode$$ = 12294, 0;
  }
  if (0 != $read$$ && 62006 != $read$$ || 0 != $draw$$ && 62006 != $draw$$) {
    return $EGL$errorCode$$ = 12301, 0;
  }
  $GL$makeContextCurrent$$($context$jscomp$9$$ ? $EGL$context$$ : null);
  $EGL$currentContext$$ = $context$jscomp$9$$;
  $EGL$currentDrawSurface$$ = $draw$$;
  $EGL$currentReadSurface$$ = $read$$;
  $EGL$errorCode$$ = 12288;
  return 1;
}, eglQueryString:($display$jscomp$9_ret$jscomp$10$$, $name$jscomp$123$$) => {
  if (62000 != $display$jscomp$9_ret$jscomp$10$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  $EGL$errorCode$$ = 12288;
  if ($EGL$stringCache$$[$name$jscomp$123$$]) {
    return $EGL$stringCache$$[$name$jscomp$123$$];
  }
  switch($name$jscomp$123$$) {
    case 12371:
      $display$jscomp$9_ret$jscomp$10$$ = $stringToNewUTF8$$("Emscripten");
      break;
    case 12372:
      $display$jscomp$9_ret$jscomp$10$$ = $stringToNewUTF8$$("1.4 Emscripten EGL");
      break;
    case 12373:
      $display$jscomp$9_ret$jscomp$10$$ = $stringToNewUTF8$$("");
      break;
    case 12429:
      $display$jscomp$9_ret$jscomp$10$$ = $stringToNewUTF8$$("OpenGL_ES");
      break;
    default:
      return $EGL$errorCode$$ = 12300, 0;
  }
  return $EGL$stringCache$$[$name$jscomp$123$$] = $display$jscomp$9_ret$jscomp$10$$;
}, eglSwapBuffers:() => {
  if ($EGL$defaultDisplayInitialized$$) {
    if ($GLctx$$) {
      if ($GLctx$$.isContextLost()) {
        $EGL$errorCode$$ = 12302;
      } else {
        return $EGL$errorCode$$ = 12288, 1;
      }
    } else {
      $EGL$errorCode$$ = 12290;
    }
  } else {
    $EGL$errorCode$$ = 12289;
  }
  return 0;
}, eglSwapInterval:($display$jscomp$10$$, $interval$$) => {
  if (62000 != $display$jscomp$10$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  0 == $interval$$ ? $_emscripten_set_main_loop_timing$$(0, 0) : $_emscripten_set_main_loop_timing$$(1, $interval$$);
  $EGL$errorCode$$ = 12288;
  return 1;
}, eglTerminate:$display$jscomp$11$$ => {
  if (62000 != $display$jscomp$11$$) {
    return $EGL$errorCode$$ = 12296, 0;
  }
  $EGL$currentDrawSurface$$ = $EGL$currentReadSurface$$ = $EGL$currentContext$$ = 0;
  $EGL$defaultDisplayInitialized$$ = !1;
  $EGL$errorCode$$ = 12288;
  return 1;
}, eglWaitGL:() => {
  $EGL$errorCode$$ = 12288;
  return 1;
}, eglWaitNative:() => {
  $EGL$errorCode$$ = 12288;
  return 1;
}, emscripten_asm_const_int:($code$jscomp$10$$, $args$jscomp$inline_355_sigPtr$jscomp$2$$, $argbuf$jscomp$1$$) => {
  $args$jscomp$inline_355_sigPtr$jscomp$2$$ = $readEmAsmArgs$$($args$jscomp$inline_355_sigPtr$jscomp$2$$, $argbuf$jscomp$1$$);
  $assert$$($ASM_CONSTS$$.hasOwnProperty($code$jscomp$10$$), `No EM_ASM constant found at address ${$code$jscomp$10$$}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return $ASM_CONSTS$$[$code$jscomp$10$$](...$args$jscomp$inline_355_sigPtr$jscomp$2$$);
}, emscripten_asm_const_int_sync_on_main_thread:($emAsmAddr$jscomp$1$$, $sigPtr$jscomp$4$$, $argbuf$jscomp$3$$) => $runMainThreadEmAsm$$($emAsmAddr$jscomp$1$$, $sigPtr$jscomp$4$$, $argbuf$jscomp$3$$), emscripten_asm_const_ptr_sync_on_main_thread:($emAsmAddr$jscomp$2$$, $sigPtr$jscomp$5$$, $argbuf$jscomp$4$$) => $runMainThreadEmAsm$$($emAsmAddr$jscomp$2$$, $sigPtr$jscomp$5$$, $argbuf$jscomp$4$$), emscripten_cancel_main_loop:() => {
  $MainLoop$pause$$();
  $MainLoop$func$$ = null;
}, emscripten_date_now:() => Date.now(), emscripten_err:$str$jscomp$24$$ => $err$$($UTF8ToString$$($str$jscomp$24$$)), emscripten_exit_fullscreen:() => {
  if (!$JSEvents$$.fullscreenEnabled()) {
    return -1;
  }
  $JSCompiler_StaticMethods_removeDeferredCalls$$($JSEvents_requestFullscreen$$);
  var $d$jscomp$1$$ = $specialHTMLTargets$$[1];
  if ($d$jscomp$1$$.exitFullscreen) {
    $d$jscomp$1$$.fullscreenElement && $d$jscomp$1$$.exitFullscreen();
  } else if ($d$jscomp$1$$.webkitExitFullscreen) {
    $d$jscomp$1$$.webkitFullscreenElement && $d$jscomp$1$$.webkitExitFullscreen();
  } else {
    return -1;
  }
  return 0;
}, emscripten_exit_pointerlock:() => {
  $JSCompiler_StaticMethods_removeDeferredCalls$$($requestPointerLock$$);
  if (!document.exitPointerLock) {
    return -1;
  }
  document.exitPointerLock();
  return 0;
}, emscripten_force_exit:$status$jscomp$4$$ => {
  $warnOnce$$("emscripten_force_exit cannot actually shut down the runtime, as the build does not have EXIT_RUNTIME set");
  $noExitRuntime$$ = !1;
  $runtimeKeepaliveCounter$$ = 0;
  $exitJS$$($status$jscomp$4$$);
}, emscripten_get_device_pixel_ratio:() => "number" == typeof devicePixelRatio && devicePixelRatio || 1.0, emscripten_get_element_css_size:($rect$jscomp$2_target$jscomp$103$$, $width$jscomp$34$$, $height$jscomp$29$$) => {
  $rect$jscomp$2_target$jscomp$103$$ = $findEventTarget$$($rect$jscomp$2_target$jscomp$103$$);
  if (!$rect$jscomp$2_target$jscomp$103$$) {
    return -4;
  }
  $rect$jscomp$2_target$jscomp$103$$ = $getBoundingClientRect$$($rect$jscomp$2_target$jscomp$103$$);
  $HEAPF64$$[$width$jscomp$34$$ >> 3] = $rect$jscomp$2_target$jscomp$103$$.width;
  $HEAPF64$$[$height$jscomp$29$$ >> 3] = $rect$jscomp$2_target$jscomp$103$$.height;
  return 0;
}, emscripten_get_gamepad_status:($index$jscomp$103$$, $gamepadState$$) => {
  if (!$JSEvents$$.$lastGamepadState$) {
    throw "emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
  }
  if (0 > $index$jscomp$103$$ || $index$jscomp$103$$ >= $JSEvents$$.$lastGamepadState$.length) {
    return -5;
  }
  if (!$JSEvents$$.$lastGamepadState$[$index$jscomp$103$$]) {
    return -7;
  }
  $fillGamepadEventData$$($gamepadState$$, $JSEvents$$.$lastGamepadState$[$index$jscomp$103$$]);
  return 0;
}, emscripten_get_heap_max:() => 2147483648, emscripten_get_now:() => performance.now(), emscripten_get_num_gamepads:() => {
  if (!$JSEvents$$.$lastGamepadState$) {
    throw "emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
  }
  return $JSEvents$$.$lastGamepadState$.length;
}, emscripten_get_preloaded_image_data:($path$jscomp$81$$, $w$jscomp$17$$, $h$jscomp$13$$) => $getPreloadedImageData$$($UTF8ToString$$($path$jscomp$81$$), $w$jscomp$17$$, $h$jscomp$13$$), emscripten_get_preloaded_image_data_from_FILE:($fd$jscomp$38_file$jscomp$4_stream$jscomp$57$$, $w$jscomp$18$$, $h$jscomp$14$$) => {
  $fd$jscomp$38_file$jscomp$4_stream$jscomp$57$$ = $_fileno$$($fd$jscomp$38_file$jscomp$4_stream$jscomp$57$$);
  return ($fd$jscomp$38_file$jscomp$4_stream$jscomp$57$$ = $FS$streams$$[$fd$jscomp$38_file$jscomp$4_stream$jscomp$57$$]) ? $getPreloadedImageData$$($fd$jscomp$38_file$jscomp$4_stream$jscomp$57$$.path, $w$jscomp$18$$, $h$jscomp$14$$) : 0;
}, emscripten_get_screen_size:($width$jscomp$35$$, $height$jscomp$30$$) => {
  $HEAP32$$[$width$jscomp$35$$ >> 2] = screen.width;
  $HEAP32$$[$height$jscomp$30$$ >> 2] = screen.height;
}, emscripten_glActiveTexture:$x0$jscomp$2$$ => $GLctx$$.activeTexture($x0$jscomp$2$$), emscripten_glAttachShader:($program$jscomp$63$$, $shader$jscomp$11$$) => {
  $GLctx$$.attachShader($GL$programs$$[$program$jscomp$63$$], $GL$shaders$$[$shader$jscomp$11$$]);
}, emscripten_glBeginQueryEXT:($target$jscomp$104$$, $id$jscomp$12$$) => {
  $GLctx$$.$disjointTimerQueryExt$.beginQueryEXT($target$jscomp$104$$, $GL$queries$$[$id$jscomp$12$$]);
}, emscripten_glBindAttribLocation:($program$jscomp$64$$, $index$jscomp$104$$, $name$jscomp$124$$) => {
  $GLctx$$.bindAttribLocation($GL$programs$$[$program$jscomp$64$$], $index$jscomp$104$$, $UTF8ToString$$($name$jscomp$124$$));
}, emscripten_glBindBuffer:($target$jscomp$105$$, $buffer$jscomp$42$$) => {
  $GLctx$$.bindBuffer($target$jscomp$105$$, $GL$buffers$$[$buffer$jscomp$42$$]);
}, emscripten_glBindFramebuffer:($target$jscomp$106$$, $framebuffer$jscomp$1$$) => {
  $GLctx$$.bindFramebuffer($target$jscomp$106$$, $GL$framebuffers$$[$framebuffer$jscomp$1$$]);
}, emscripten_glBindRenderbuffer:($target$jscomp$107$$, $renderbuffer$jscomp$2$$) => {
  $GLctx$$.bindRenderbuffer($target$jscomp$107$$, $GL$renderbuffers$$[$renderbuffer$jscomp$2$$]);
}, emscripten_glBindTexture:($target$jscomp$108$$, $texture$jscomp$7$$) => {
  $GLctx$$.bindTexture($target$jscomp$108$$, $GL$textures$$[$texture$jscomp$7$$]);
}, emscripten_glBindVertexArrayOES:$vao$jscomp$3$$ => {
  $GLctx$$.bindVertexArray($GL$vaos$$[$vao$jscomp$3$$]);
}, emscripten_glBlendColor:($x0$jscomp$3$$, $x1$jscomp$5$$, $x2$jscomp$3$$, $x3$$) => $GLctx$$.blendColor($x0$jscomp$3$$, $x1$jscomp$5$$, $x2$jscomp$3$$, $x3$$), emscripten_glBlendEquation:$x0$jscomp$4$$ => $GLctx$$.blendEquation($x0$jscomp$4$$), emscripten_glBlendEquationSeparate:($x0$jscomp$5$$, $x1$jscomp$6$$) => $GLctx$$.blendEquationSeparate($x0$jscomp$5$$, $x1$jscomp$6$$), emscripten_glBlendFunc:($x0$jscomp$6$$, $x1$jscomp$7$$) => $GLctx$$.blendFunc($x0$jscomp$6$$, $x1$jscomp$7$$), emscripten_glBlendFuncSeparate:($x0$jscomp$7$$, 
$x1$jscomp$8$$, $x2$jscomp$4$$, $x3$jscomp$1$$) => $GLctx$$.blendFuncSeparate($x0$jscomp$7$$, $x1$jscomp$8$$, $x2$jscomp$4$$, $x3$jscomp$1$$), emscripten_glBufferData:($target$jscomp$109$$, $size$jscomp$36$$, $data$jscomp$97$$, $usage$jscomp$2$$) => {
  $GLctx$$.bufferData($target$jscomp$109$$, $data$jscomp$97$$ ? $HEAPU8$$.subarray($data$jscomp$97$$, $data$jscomp$97$$ + $size$jscomp$36$$) : $size$jscomp$36$$, $usage$jscomp$2$$);
}, emscripten_glBufferSubData:($target$jscomp$110$$, $offset$jscomp$87$$, $size$jscomp$37$$, $data$jscomp$98$$) => {
  $GLctx$$.bufferSubData($target$jscomp$110$$, $offset$jscomp$87$$, $HEAPU8$$.subarray($data$jscomp$98$$, $data$jscomp$98$$ + $size$jscomp$37$$));
}, emscripten_glCheckFramebufferStatus:$x0$jscomp$8$$ => $GLctx$$.checkFramebufferStatus($x0$jscomp$8$$), emscripten_glClear:$x0$jscomp$9$$ => $GLctx$$.clear($x0$jscomp$9$$), emscripten_glClearColor:($x0$jscomp$10$$, $x1$jscomp$9$$, $x2$jscomp$5$$, $x3$jscomp$2$$) => $GLctx$$.clearColor($x0$jscomp$10$$, $x1$jscomp$9$$, $x2$jscomp$5$$, $x3$jscomp$2$$), emscripten_glClearDepthf:$x0$jscomp$11$$ => $GLctx$$.clearDepth($x0$jscomp$11$$), emscripten_glClearStencil:$x0$jscomp$12$$ => $GLctx$$.clearStencil($x0$jscomp$12$$), 
emscripten_glClipControlEXT:($origin$jscomp$1$$, $depth$jscomp$9$$) => {
  $GLctx$$.$extClipControl$.clipControlEXT($origin$jscomp$1$$, $depth$jscomp$9$$);
}, emscripten_glColorMask:($red$jscomp$3$$, $green$jscomp$3$$, $blue$jscomp$3$$, $alpha$jscomp$3$$) => {
  $GLctx$$.colorMask(!!$red$jscomp$3$$, !!$green$jscomp$3$$, !!$blue$jscomp$3$$, !!$alpha$jscomp$3$$);
}, emscripten_glCompileShader:$shader$jscomp$12$$ => {
  $GLctx$$.compileShader($GL$shaders$$[$shader$jscomp$12$$]);
}, emscripten_glCompressedTexImage2D:($target$jscomp$111$$, $level$jscomp$19$$, $internalFormat$$, $width$jscomp$36$$, $height$jscomp$31$$, $border$jscomp$5$$, $imageSize$$, $data$jscomp$99$$) => {
  $GLctx$$.compressedTexImage2D($target$jscomp$111$$, $level$jscomp$19$$, $internalFormat$$, $width$jscomp$36$$, $height$jscomp$31$$, $border$jscomp$5$$, $HEAPU8$$.subarray($data$jscomp$99$$, $data$jscomp$99$$ + $imageSize$$));
}, emscripten_glCompressedTexSubImage2D:($target$jscomp$112$$, $level$jscomp$20$$, $xoffset$jscomp$8$$, $yoffset$jscomp$8$$, $width$jscomp$37$$, $height$jscomp$32$$, $format$jscomp$20$$, $imageSize$jscomp$1$$, $data$jscomp$100$$) => {
  $GLctx$$.compressedTexSubImage2D($target$jscomp$112$$, $level$jscomp$20$$, $xoffset$jscomp$8$$, $yoffset$jscomp$8$$, $width$jscomp$37$$, $height$jscomp$32$$, $format$jscomp$20$$, $HEAPU8$$.subarray($data$jscomp$100$$, $data$jscomp$100$$ + $imageSize$jscomp$1$$));
}, emscripten_glCopyTexImage2D:($x0$jscomp$13$$, $x1$jscomp$10$$, $x2$jscomp$6$$, $x3$jscomp$3$$, $x4$$, $x5$$, $x6$$, $x7$$) => $GLctx$$.copyTexImage2D($x0$jscomp$13$$, $x1$jscomp$10$$, $x2$jscomp$6$$, $x3$jscomp$3$$, $x4$$, $x5$$, $x6$$, $x7$$), emscripten_glCopyTexSubImage2D:($x0$jscomp$14$$, $x1$jscomp$11$$, $x2$jscomp$7$$, $x3$jscomp$4$$, $x4$jscomp$1$$, $x5$jscomp$1$$, $x6$jscomp$1$$, $x7$jscomp$1$$) => $GLctx$$.copyTexSubImage2D($x0$jscomp$14$$, $x1$jscomp$11$$, $x2$jscomp$7$$, $x3$jscomp$4$$, 
$x4$jscomp$1$$, $x5$jscomp$1$$, $x6$jscomp$1$$, $x7$jscomp$1$$), emscripten_glCreateProgram:() => {
  var $id$jscomp$13$$ = $GL$getNewId$$($GL$programs$$), $program$jscomp$65$$ = $GLctx$$.createProgram();
  $program$jscomp$65$$.name = $id$jscomp$13$$;
  $program$jscomp$65$$.$maxUniformLength$ = $program$jscomp$65$$.$maxAttributeLength$ = $program$jscomp$65$$.$maxUniformBlockNameLength$ = 0;
  $program$jscomp$65$$.$uniformIdCounter$ = 1;
  $GL$programs$$[$id$jscomp$13$$] = $program$jscomp$65$$;
  return $id$jscomp$13$$;
}, emscripten_glCreateShader:$shaderType$$ => {
  var $id$jscomp$14$$ = $GL$getNewId$$($GL$shaders$$);
  $GL$shaders$$[$id$jscomp$14$$] = $GLctx$$.createShader($shaderType$$);
  return $id$jscomp$14$$;
}, emscripten_glCullFace:$x0$jscomp$15$$ => $GLctx$$.cullFace($x0$jscomp$15$$), emscripten_glDeleteBuffers:($n$jscomp$7$$, $buffers$jscomp$3$$) => {
  for (var $i$jscomp$38$$ = 0; $i$jscomp$38$$ < $n$jscomp$7$$; $i$jscomp$38$$++) {
    var $id$jscomp$15$$ = $HEAP32$$[$buffers$jscomp$3$$ + 4 * $i$jscomp$38$$ >> 2], $buffer$jscomp$43$$ = $GL$buffers$$[$id$jscomp$15$$];
    $buffer$jscomp$43$$ && ($GLctx$$.deleteBuffer($buffer$jscomp$43$$), $buffer$jscomp$43$$.name = 0, $GL$buffers$$[$id$jscomp$15$$] = null);
  }
}, emscripten_glDeleteFramebuffers:($n$jscomp$8$$, $framebuffers$$) => {
  for (var $i$jscomp$39$$ = 0; $i$jscomp$39$$ < $n$jscomp$8$$; ++$i$jscomp$39$$) {
    var $id$jscomp$16$$ = $HEAP32$$[$framebuffers$$ + 4 * $i$jscomp$39$$ >> 2], $framebuffer$jscomp$2$$ = $GL$framebuffers$$[$id$jscomp$16$$];
    $framebuffer$jscomp$2$$ && ($GLctx$$.deleteFramebuffer($framebuffer$jscomp$2$$), $framebuffer$jscomp$2$$.name = 0, $GL$framebuffers$$[$id$jscomp$16$$] = null);
  }
}, emscripten_glDeleteProgram:$id$jscomp$17$$ => {
  if ($id$jscomp$17$$) {
    var $program$jscomp$66$$ = $GL$programs$$[$id$jscomp$17$$];
    $program$jscomp$66$$ ? ($GLctx$$.deleteProgram($program$jscomp$66$$), $program$jscomp$66$$.name = 0, $GL$programs$$[$id$jscomp$17$$] = null) : $GL$lastError$$ ||= 1281;
  }
}, emscripten_glDeleteQueriesEXT:($n$jscomp$9$$, $ids$$) => {
  for (var $i$jscomp$40$$ = 0; $i$jscomp$40$$ < $n$jscomp$9$$; $i$jscomp$40$$++) {
    var $id$jscomp$18$$ = $HEAP32$$[$ids$$ + 4 * $i$jscomp$40$$ >> 2], $query$jscomp$13$$ = $GL$queries$$[$id$jscomp$18$$];
    $query$jscomp$13$$ && ($GLctx$$.$disjointTimerQueryExt$.deleteQueryEXT($query$jscomp$13$$), $GL$queries$$[$id$jscomp$18$$] = null);
  }
}, emscripten_glDeleteRenderbuffers:($n$jscomp$10$$, $renderbuffers$$) => {
  for (var $i$jscomp$41$$ = 0; $i$jscomp$41$$ < $n$jscomp$10$$; $i$jscomp$41$$++) {
    var $id$jscomp$19$$ = $HEAP32$$[$renderbuffers$$ + 4 * $i$jscomp$41$$ >> 2], $renderbuffer$jscomp$3$$ = $GL$renderbuffers$$[$id$jscomp$19$$];
    $renderbuffer$jscomp$3$$ && ($GLctx$$.deleteRenderbuffer($renderbuffer$jscomp$3$$), $renderbuffer$jscomp$3$$.name = 0, $GL$renderbuffers$$[$id$jscomp$19$$] = null);
  }
}, emscripten_glDeleteShader:$id$jscomp$20$$ => {
  if ($id$jscomp$20$$) {
    var $shader$jscomp$13$$ = $GL$shaders$$[$id$jscomp$20$$];
    $shader$jscomp$13$$ ? ($GLctx$$.deleteShader($shader$jscomp$13$$), $GL$shaders$$[$id$jscomp$20$$] = null) : $GL$lastError$$ ||= 1281;
  }
}, emscripten_glDeleteTextures:($n$jscomp$11$$, $textures$$) => {
  for (var $i$jscomp$42$$ = 0; $i$jscomp$42$$ < $n$jscomp$11$$; $i$jscomp$42$$++) {
    var $id$jscomp$21$$ = $HEAP32$$[$textures$$ + 4 * $i$jscomp$42$$ >> 2], $texture$jscomp$8$$ = $GL$textures$$[$id$jscomp$21$$];
    $texture$jscomp$8$$ && ($GLctx$$.deleteTexture($texture$jscomp$8$$), $texture$jscomp$8$$.name = 0, $GL$textures$$[$id$jscomp$21$$] = null);
  }
}, emscripten_glDeleteVertexArraysOES:($n$jscomp$12$$, $vaos$$) => {
  for (var $i$jscomp$43$$ = 0; $i$jscomp$43$$ < $n$jscomp$12$$; $i$jscomp$43$$++) {
    var $id$jscomp$22$$ = $HEAP32$$[$vaos$$ + 4 * $i$jscomp$43$$ >> 2];
    $GLctx$$.deleteVertexArray($GL$vaos$$[$id$jscomp$22$$]);
    $GL$vaos$$[$id$jscomp$22$$] = null;
  }
}, emscripten_glDepthFunc:$x0$jscomp$16$$ => $GLctx$$.depthFunc($x0$jscomp$16$$), emscripten_glDepthMask:$flag$jscomp$4$$ => {
  $GLctx$$.depthMask(!!$flag$jscomp$4$$);
}, emscripten_glDepthRangef:($x0$jscomp$17$$, $x1$jscomp$12$$) => $GLctx$$.depthRange($x0$jscomp$17$$, $x1$jscomp$12$$), emscripten_glDetachShader:($program$jscomp$67$$, $shader$jscomp$14$$) => {
  $GLctx$$.detachShader($GL$programs$$[$program$jscomp$67$$], $GL$shaders$$[$shader$jscomp$14$$]);
}, emscripten_glDisable:$x0$jscomp$18$$ => $GLctx$$.disable($x0$jscomp$18$$), emscripten_glDisableVertexAttribArray:$index$jscomp$105$$ => {
  $GLctx$$.disableVertexAttribArray($index$jscomp$105$$);
}, emscripten_glDrawArrays:($mode$jscomp$56$$, $first$jscomp$5$$, $count$jscomp$42$$) => {
  $GLctx$$.drawArrays($mode$jscomp$56$$, $first$jscomp$5$$, $count$jscomp$42$$);
}, emscripten_glDrawArraysInstancedANGLE:($mode$jscomp$57$$, $first$jscomp$6$$, $count$jscomp$43$$, $primcount$jscomp$4$$) => {
  $GLctx$$.drawArraysInstanced($mode$jscomp$57$$, $first$jscomp$6$$, $count$jscomp$43$$, $primcount$jscomp$4$$);
}, emscripten_glDrawBuffersWEBGL:($n$jscomp$13$$, $bufs$jscomp$1$$) => {
  for (var $bufArray$$ = $tempFixedLengthArray$$[$n$jscomp$13$$], $i$jscomp$44$$ = 0; $i$jscomp$44$$ < $n$jscomp$13$$; $i$jscomp$44$$++) {
    $bufArray$$[$i$jscomp$44$$] = $HEAP32$$[$bufs$jscomp$1$$ + 4 * $i$jscomp$44$$ >> 2];
  }
  $GLctx$$.drawBuffers($bufArray$$);
}, emscripten_glDrawElements:($mode$jscomp$58$$, $count$jscomp$44$$, $type$jscomp$177$$, $indices$jscomp$1$$) => {
  $GLctx$$.drawElements($mode$jscomp$58$$, $count$jscomp$44$$, $type$jscomp$177$$, $indices$jscomp$1$$);
}, emscripten_glDrawElementsInstancedANGLE:($mode$jscomp$59$$, $count$jscomp$45$$, $type$jscomp$178$$, $indices$jscomp$2$$, $primcount$jscomp$5$$) => {
  $GLctx$$.drawElementsInstanced($mode$jscomp$59$$, $count$jscomp$45$$, $type$jscomp$178$$, $indices$jscomp$2$$, $primcount$jscomp$5$$);
}, emscripten_glEnable:$x0$jscomp$19$$ => $GLctx$$.enable($x0$jscomp$19$$), emscripten_glEnableVertexAttribArray:$index$jscomp$106$$ => {
  $GLctx$$.enableVertexAttribArray($index$jscomp$106$$);
}, emscripten_glEndQueryEXT:$target$jscomp$113$$ => {
  $GLctx$$.$disjointTimerQueryExt$.endQueryEXT($target$jscomp$113$$);
}, emscripten_glFinish:() => $GLctx$$.finish(), emscripten_glFlush:() => $GLctx$$.flush(), emscripten_glFramebufferRenderbuffer:($target$jscomp$114$$, $attachment$jscomp$4$$, $renderbuffertarget$jscomp$1$$, $renderbuffer$jscomp$4$$) => {
  $GLctx$$.framebufferRenderbuffer($target$jscomp$114$$, $attachment$jscomp$4$$, $renderbuffertarget$jscomp$1$$, $GL$renderbuffers$$[$renderbuffer$jscomp$4$$]);
}, emscripten_glFramebufferTexture2D:($target$jscomp$115$$, $attachment$jscomp$5$$, $textarget$jscomp$1$$, $texture$jscomp$9$$, $level$jscomp$21$$) => {
  $GLctx$$.framebufferTexture2D($target$jscomp$115$$, $attachment$jscomp$5$$, $textarget$jscomp$1$$, $GL$textures$$[$texture$jscomp$9$$], $level$jscomp$21$$);
}, emscripten_glFrontFace:$x0$jscomp$20$$ => $GLctx$$.frontFace($x0$jscomp$20$$), emscripten_glGenBuffers:($n$jscomp$14$$, $buffers$jscomp$4$$) => {
  $GL$genObject$$($n$jscomp$14$$, $buffers$jscomp$4$$, "createBuffer", $GL$buffers$$);
}, emscripten_glGenFramebuffers:($n$jscomp$15$$, $ids$jscomp$1$$) => {
  $GL$genObject$$($n$jscomp$15$$, $ids$jscomp$1$$, "createFramebuffer", $GL$framebuffers$$);
}, emscripten_glGenQueriesEXT:($n$jscomp$16$$, $ids$jscomp$2$$) => {
  for (var $i$jscomp$45$$ = 0; $i$jscomp$45$$ < $n$jscomp$16$$; $i$jscomp$45$$++) {
    var $query$jscomp$14$$ = $GLctx$$.$disjointTimerQueryExt$.createQueryEXT();
    if (!$query$jscomp$14$$) {
      for ($GL$lastError$$ ||= 1282; $i$jscomp$45$$ < $n$jscomp$16$$;) {
        $HEAP32$$[$ids$jscomp$2$$ + 4 * $i$jscomp$45$$++ >> 2] = 0;
      }
      break;
    }
    var $id$jscomp$23$$ = $GL$getNewId$$($GL$queries$$);
    $query$jscomp$14$$.name = $id$jscomp$23$$;
    $GL$queries$$[$id$jscomp$23$$] = $query$jscomp$14$$;
    $HEAP32$$[$ids$jscomp$2$$ + 4 * $i$jscomp$45$$ >> 2] = $id$jscomp$23$$;
  }
}, emscripten_glGenRenderbuffers:($n$jscomp$17$$, $renderbuffers$jscomp$1$$) => {
  $GL$genObject$$($n$jscomp$17$$, $renderbuffers$jscomp$1$$, "createRenderbuffer", $GL$renderbuffers$$);
}, emscripten_glGenTextures:($n$jscomp$18$$, $textures$jscomp$1$$) => {
  $GL$genObject$$($n$jscomp$18$$, $textures$jscomp$1$$, "createTexture", $GL$textures$$);
}, emscripten_glGenVertexArraysOES:($n$jscomp$19$$, $arrays$$) => {
  $GL$genObject$$($n$jscomp$19$$, $arrays$$, "createVertexArray", $GL$vaos$$);
}, emscripten_glGenerateMipmap:$x0$jscomp$21$$ => $GLctx$$.generateMipmap($x0$jscomp$21$$), emscripten_glGetActiveAttrib:($program$jscomp$69$$, $index$jscomp$108$$, $bufSize$jscomp$1$$, $length$jscomp$50$$, $size$jscomp$39$$, $type$jscomp$180$$, $name$jscomp$126$$) => $__glGetActiveAttribOrUniform$$("getActiveAttrib", $program$jscomp$69$$, $index$jscomp$108$$, $bufSize$jscomp$1$$, $length$jscomp$50$$, $size$jscomp$39$$, $type$jscomp$180$$, $name$jscomp$126$$), emscripten_glGetActiveUniform:($program$jscomp$70$$, 
$index$jscomp$109$$, $bufSize$jscomp$2$$, $length$jscomp$51$$, $size$jscomp$40$$, $type$jscomp$181$$, $name$jscomp$127$$) => $__glGetActiveAttribOrUniform$$("getActiveUniform", $program$jscomp$70$$, $index$jscomp$109$$, $bufSize$jscomp$2$$, $length$jscomp$51$$, $size$jscomp$40$$, $type$jscomp$181$$, $name$jscomp$127$$), emscripten_glGetAttachedShaders:($program$jscomp$71_result$jscomp$7$$, $i$jscomp$46_maxCount$$, $count$jscomp$46$$, $shaders$$) => {
  $program$jscomp$71_result$jscomp$7$$ = $GLctx$$.getAttachedShaders($GL$programs$$[$program$jscomp$71_result$jscomp$7$$]);
  var $len$jscomp$14$$ = $program$jscomp$71_result$jscomp$7$$.length;
  $len$jscomp$14$$ > $i$jscomp$46_maxCount$$ && ($len$jscomp$14$$ = $i$jscomp$46_maxCount$$);
  $HEAP32$$[$count$jscomp$46$$ >> 2] = $len$jscomp$14$$;
  for ($i$jscomp$46_maxCount$$ = 0; $i$jscomp$46_maxCount$$ < $len$jscomp$14$$; ++$i$jscomp$46_maxCount$$) {
    $HEAP32$$[$shaders$$ + 4 * $i$jscomp$46_maxCount$$ >> 2] = $GL$shaders$$.indexOf($program$jscomp$71_result$jscomp$7$$[$i$jscomp$46_maxCount$$]);
  }
}, emscripten_glGetAttribLocation:($program$jscomp$72$$, $name$jscomp$128$$) => $GLctx$$.getAttribLocation($GL$programs$$[$program$jscomp$72$$], $UTF8ToString$$($name$jscomp$128$$)), emscripten_glGetBooleanv:($name_$jscomp$1$$, $p$jscomp$8$$) => $emscriptenWebGLGet$$($name_$jscomp$1$$, $p$jscomp$8$$, 4), emscripten_glGetBufferParameteriv:($target$jscomp$116$$, $value$jscomp$129$$, $data$jscomp$101$$) => {
  $data$jscomp$101$$ ? $HEAP32$$[$data$jscomp$101$$ >> 2] = $GLctx$$.getBufferParameter($target$jscomp$116$$, $value$jscomp$129$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetError:() => {
  var $error$jscomp$5$$ = $GLctx$$.getError() || $GL$lastError$$;
  $GL$lastError$$ = 0;
  return $error$jscomp$5$$;
}, emscripten_glGetFloatv:($name_$jscomp$2$$, $p$jscomp$9$$) => $emscriptenWebGLGet$$($name_$jscomp$2$$, $p$jscomp$9$$, 2), emscripten_glGetFramebufferAttachmentParameteriv:($result$jscomp$9_target$jscomp$117$$, $attachment$jscomp$6$$, $pname$jscomp$26$$, $params$jscomp$1$$) => {
  $result$jscomp$9_target$jscomp$117$$ = $GLctx$$.getFramebufferAttachmentParameter($result$jscomp$9_target$jscomp$117$$, $attachment$jscomp$6$$, $pname$jscomp$26$$);
  if ($result$jscomp$9_target$jscomp$117$$ instanceof WebGLRenderbuffer || $result$jscomp$9_target$jscomp$117$$ instanceof WebGLTexture) {
    $result$jscomp$9_target$jscomp$117$$ = $result$jscomp$9_target$jscomp$117$$.name | 0;
  }
  $HEAP32$$[$params$jscomp$1$$ >> 2] = $result$jscomp$9_target$jscomp$117$$;
}, emscripten_glGetIntegerv:($name_$jscomp$3$$, $p$jscomp$10$$) => $emscriptenWebGLGet$$($name_$jscomp$3$$, $p$jscomp$10$$, 0), emscripten_glGetProgramInfoLog:($log_program$jscomp$73$$, $maxLength_numBytesWrittenExclNull$jscomp$1$$, $length$jscomp$52$$, $infoLog$$) => {
  $log_program$jscomp$73$$ = $GLctx$$.getProgramInfoLog($GL$programs$$[$log_program$jscomp$73$$]);
  null === $log_program$jscomp$73$$ && ($log_program$jscomp$73$$ = "(unknown error)");
  $maxLength_numBytesWrittenExclNull$jscomp$1$$ = 0 < $maxLength_numBytesWrittenExclNull$jscomp$1$$ && $infoLog$$ ? $stringToUTF8$$($log_program$jscomp$73$$, $infoLog$$, $maxLength_numBytesWrittenExclNull$jscomp$1$$) : 0;
  $length$jscomp$52$$ && ($HEAP32$$[$length$jscomp$52$$ >> 2] = $maxLength_numBytesWrittenExclNull$jscomp$1$$);
}, emscripten_glGetProgramiv:($log$jscomp$1_program$jscomp$74$$, $i$jscomp$48_pname$jscomp$27$$, $p$jscomp$11$$) => {
  if ($p$jscomp$11$$) {
    if ($log$jscomp$1_program$jscomp$74$$ >= $GL$counter$$) {
      $GL$lastError$$ ||= 1281;
    } else {
      if ($log$jscomp$1_program$jscomp$74$$ = $GL$programs$$[$log$jscomp$1_program$jscomp$74$$], 35716 == $i$jscomp$48_pname$jscomp$27$$) {
        $log$jscomp$1_program$jscomp$74$$ = $GLctx$$.getProgramInfoLog($log$jscomp$1_program$jscomp$74$$), null === $log$jscomp$1_program$jscomp$74$$ && ($log$jscomp$1_program$jscomp$74$$ = "(unknown error)"), $HEAP32$$[$p$jscomp$11$$ >> 2] = $log$jscomp$1_program$jscomp$74$$.length + 1;
      } else if (35719 == $i$jscomp$48_pname$jscomp$27$$) {
        if (!$log$jscomp$1_program$jscomp$74$$.$maxUniformLength$) {
          var $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, 35718);
          for ($i$jscomp$48_pname$jscomp$27$$ = 0; $i$jscomp$48_pname$jscomp$27$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$48_pname$jscomp$27$$) {
            $log$jscomp$1_program$jscomp$74$$.$maxUniformLength$ = Math.max($log$jscomp$1_program$jscomp$74$$.$maxUniformLength$, $GLctx$$.getActiveUniform($log$jscomp$1_program$jscomp$74$$, $i$jscomp$48_pname$jscomp$27$$).name.length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$11$$ >> 2] = $log$jscomp$1_program$jscomp$74$$.$maxUniformLength$;
      } else if (35722 == $i$jscomp$48_pname$jscomp$27$$) {
        if (!$log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$) {
          for ($numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, 35721), $i$jscomp$48_pname$jscomp$27$$ = 0; $i$jscomp$48_pname$jscomp$27$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$48_pname$jscomp$27$$) {
            $log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$ = Math.max($log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$, $GLctx$$.getActiveAttrib($log$jscomp$1_program$jscomp$74$$, $i$jscomp$48_pname$jscomp$27$$).name.length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$11$$ >> 2] = $log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$;
      } else if (35381 == $i$jscomp$48_pname$jscomp$27$$) {
        if (!$log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$) {
          for ($numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, 35382), $i$jscomp$48_pname$jscomp$27$$ = 0; $i$jscomp$48_pname$jscomp$27$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$48_pname$jscomp$27$$) {
            $log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$ = Math.max($log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$, $GLctx$$.getActiveUniformBlockName($log$jscomp$1_program$jscomp$74$$, $i$jscomp$48_pname$jscomp$27$$).length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$11$$ >> 2] = $log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$;
      } else {
        $HEAP32$$[$p$jscomp$11$$ >> 2] = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, $i$jscomp$48_pname$jscomp$27$$);
      }
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, emscripten_glGetQueryObjecti64vEXT:$_glGetQueryObjecti64vEXT$$, emscripten_glGetQueryObjectivEXT:$_glGetQueryObjectivEXT$$, emscripten_glGetQueryObjectui64vEXT:$_glGetQueryObjecti64vEXT$$, emscripten_glGetQueryObjectuivEXT:$_glGetQueryObjectivEXT$$, emscripten_glGetQueryivEXT:($target$jscomp$118$$, $pname$jscomp$30$$, $params$jscomp$4$$) => {
  $params$jscomp$4$$ ? $HEAP32$$[$params$jscomp$4$$ >> 2] = $GLctx$$.$disjointTimerQueryExt$.getQueryEXT($target$jscomp$118$$, $pname$jscomp$30$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetRenderbufferParameteriv:($target$jscomp$119$$, $pname$jscomp$31$$, $params$jscomp$5$$) => {
  $params$jscomp$5$$ ? $HEAP32$$[$params$jscomp$5$$ >> 2] = $GLctx$$.getRenderbufferParameter($target$jscomp$119$$, $pname$jscomp$31$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetShaderInfoLog:($log$jscomp$2_shader$jscomp$15$$, $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$, $length$jscomp$53$$, $infoLog$jscomp$1$$) => {
  $log$jscomp$2_shader$jscomp$15$$ = $GLctx$$.getShaderInfoLog($GL$shaders$$[$log$jscomp$2_shader$jscomp$15$$]);
  null === $log$jscomp$2_shader$jscomp$15$$ && ($log$jscomp$2_shader$jscomp$15$$ = "(unknown error)");
  $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$ = 0 < $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$ && $infoLog$jscomp$1$$ ? $stringToUTF8$$($log$jscomp$2_shader$jscomp$15$$, $infoLog$jscomp$1$$, $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$) : 0;
  $length$jscomp$53$$ && ($HEAP32$$[$length$jscomp$53$$ >> 2] = $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$);
}, emscripten_glGetShaderPrecisionFormat:($result$jscomp$10_shaderType$jscomp$1$$, $precisionType$$, $range$jscomp$5$$, $precision$$) => {
  $result$jscomp$10_shaderType$jscomp$1$$ = $GLctx$$.getShaderPrecisionFormat($result$jscomp$10_shaderType$jscomp$1$$, $precisionType$$);
  $HEAP32$$[$range$jscomp$5$$ >> 2] = $result$jscomp$10_shaderType$jscomp$1$$.rangeMin;
  $HEAP32$$[$range$jscomp$5$$ + 4 >> 2] = $result$jscomp$10_shaderType$jscomp$1$$.rangeMax;
  $HEAP32$$[$precision$$ >> 2] = $result$jscomp$10_shaderType$jscomp$1$$.precision;
}, emscripten_glGetShaderSource:($result$jscomp$11_shader$jscomp$16$$, $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$, $length$jscomp$54$$, $source$jscomp$18$$) => {
  if ($result$jscomp$11_shader$jscomp$16$$ = $GLctx$$.getShaderSource($GL$shaders$$[$result$jscomp$11_shader$jscomp$16$$])) {
    $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$ = 0 < $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$ && $source$jscomp$18$$ ? $stringToUTF8$$($result$jscomp$11_shader$jscomp$16$$, $source$jscomp$18$$, $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$) : 0, $length$jscomp$54$$ && ($HEAP32$$[$length$jscomp$54$$ >> 2] = $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$);
  }
}, emscripten_glGetShaderiv:($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$, $pname$jscomp$32$$, $p$jscomp$12$$) => {
  $p$jscomp$12$$ ? 35716 == $pname$jscomp$32$$ ? ($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ = $GLctx$$.getShaderInfoLog($GL$shaders$$[$log$jscomp$3_shader$jscomp$17_source$jscomp$19$$]), null === $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ && ($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ = "(unknown error)"), $HEAP32$$[$p$jscomp$12$$ >> 2] = $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ ? $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$.length + 1 : 0) : 35720 == $pname$jscomp$32$$ ? 
  ($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ = $GLctx$$.getShaderSource($GL$shaders$$[$log$jscomp$3_shader$jscomp$17_source$jscomp$19$$]), $HEAP32$$[$p$jscomp$12$$ >> 2] = $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ ? $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$.length + 1 : 0) : $HEAP32$$[$p$jscomp$12$$ >> 2] = $GLctx$$.getShaderParameter($GL$shaders$$[$log$jscomp$3_shader$jscomp$17_source$jscomp$19$$], $pname$jscomp$32$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetString:$name_$jscomp$4$$ => {
  var $glslVersion_ret$jscomp$16_s$jscomp$6$$ = $GL$stringCache$$[$name_$jscomp$4$$];
  if (!$glslVersion_ret$jscomp$16_s$jscomp$6$$) {
    switch($name_$jscomp$4$$) {
      case 7939:
        $glslVersion_ret$jscomp$16_s$jscomp$6$$ = $stringToNewUTF8$$($webglGetExtensions$$().join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        ($glslVersion_ret$jscomp$16_s$jscomp$6$$ = $GLctx$$.getParameter($name_$jscomp$4$$)) || ($GL$lastError$$ ||= 1280);
        $glslVersion_ret$jscomp$16_s$jscomp$6$$ = $glslVersion_ret$jscomp$16_s$jscomp$6$$ ? $stringToNewUTF8$$($glslVersion_ret$jscomp$16_s$jscomp$6$$) : 0;
        break;
      case 7938:
        $glslVersion_ret$jscomp$16_s$jscomp$6$$ = $stringToNewUTF8$$(`OpenGL ES 2.0 (${$GLctx$$.getParameter(7938)})`);
        break;
      case 35724:
        $glslVersion_ret$jscomp$16_s$jscomp$6$$ = $GLctx$$.getParameter(35724);
        var $ver_num$$ = $glslVersion_ret$jscomp$16_s$jscomp$6$$.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
        null !== $ver_num$$ && (3 == $ver_num$$[1].length && ($ver_num$$[1] += "0"), $glslVersion_ret$jscomp$16_s$jscomp$6$$ = `OpenGL ES GLSL ES ${$ver_num$$[1]} (${$glslVersion_ret$jscomp$16_s$jscomp$6$$})`);
        $glslVersion_ret$jscomp$16_s$jscomp$6$$ = $stringToNewUTF8$$($glslVersion_ret$jscomp$16_s$jscomp$6$$);
        break;
      default:
        $GL$lastError$$ ||= 1280;
    }
    $GL$stringCache$$[$name_$jscomp$4$$] = $glslVersion_ret$jscomp$16_s$jscomp$6$$;
  }
  return $glslVersion_ret$jscomp$16_s$jscomp$6$$;
}, emscripten_glGetTexParameterfv:($target$jscomp$120$$, $pname$jscomp$33$$, $params$jscomp$6$$) => {
  $params$jscomp$6$$ ? $HEAPF32$$[$params$jscomp$6$$ >> 2] = $GLctx$$.getTexParameter($target$jscomp$120$$, $pname$jscomp$33$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetTexParameteriv:($target$jscomp$121$$, $pname$jscomp$34$$, $params$jscomp$7$$) => {
  $params$jscomp$7$$ ? $HEAP32$$[$params$jscomp$7$$ >> 2] = $GLctx$$.getTexParameter($target$jscomp$121$$, $pname$jscomp$34$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetUniformLocation:($program$jscomp$76$$, $name$jscomp$130$$) => {
  $name$jscomp$130$$ = $UTF8ToString$$($name$jscomp$130$$);
  if ($program$jscomp$76$$ = $GL$programs$$[$program$jscomp$76$$]) {
    $webglPrepareUniformLocationsBeforeFirstUse$$($program$jscomp$76$$);
    var $uniformLocsById$jscomp$1$$ = $program$jscomp$76$$.$uniformLocsById$, $arrayIndex$$ = 0, $sizeAndId_uniformBaseName$$ = $name$jscomp$130$$, $leftBrace$$ = $webglGetLeftBracePos$$($name$jscomp$130$$);
    0 < $leftBrace$$ && ($arrayIndex$$ = parseInt($name$jscomp$130$$.slice($leftBrace$$ + 1)) >>> 0, $sizeAndId_uniformBaseName$$ = $name$jscomp$130$$.slice(0, $leftBrace$$));
    if (($sizeAndId_uniformBaseName$$ = $program$jscomp$76$$.$uniformSizeAndIdsByName$[$sizeAndId_uniformBaseName$$]) && $arrayIndex$$ < $sizeAndId_uniformBaseName$$[0] && ($arrayIndex$$ += $sizeAndId_uniformBaseName$$[1], $uniformLocsById$jscomp$1$$[$arrayIndex$$] = $uniformLocsById$jscomp$1$$[$arrayIndex$$] || $GLctx$$.getUniformLocation($program$jscomp$76$$, $name$jscomp$130$$))) {
      return $arrayIndex$$;
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
  return -1;
}, emscripten_glGetUniformfv:($program$jscomp$78$$, $location$jscomp$81$$, $params$jscomp$9$$) => {
  $emscriptenWebGLGetUniform$$($program$jscomp$78$$, $location$jscomp$81$$, $params$jscomp$9$$, 2);
}, emscripten_glGetUniformiv:($program$jscomp$79$$, $location$jscomp$82$$, $params$jscomp$10$$) => {
  $emscriptenWebGLGetUniform$$($program$jscomp$79$$, $location$jscomp$82$$, $params$jscomp$10$$, 0);
}, emscripten_glGetVertexAttribPointerv:($index$jscomp$110$$, $pname$jscomp$35$$, $pointer$jscomp$12$$) => {
  $pointer$jscomp$12$$ ? $HEAP32$$[$pointer$jscomp$12$$ >> 2] = $GLctx$$.getVertexAttribOffset($index$jscomp$110$$, $pname$jscomp$35$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetVertexAttribfv:($index$jscomp$112$$, $pname$jscomp$37$$, $params$jscomp$12$$) => {
  $emscriptenWebGLGetVertexAttrib$$($index$jscomp$112$$, $pname$jscomp$37$$, $params$jscomp$12$$, 2);
}, emscripten_glGetVertexAttribiv:($index$jscomp$113$$, $pname$jscomp$38$$, $params$jscomp$13$$) => {
  $emscriptenWebGLGetVertexAttrib$$($index$jscomp$113$$, $pname$jscomp$38$$, $params$jscomp$13$$, 5);
}, emscripten_glHint:($x0$jscomp$22$$, $x1$jscomp$13$$) => $GLctx$$.hint($x0$jscomp$22$$, $x1$jscomp$13$$), emscripten_glIsBuffer:$b$jscomp$5_buffer$jscomp$44$$ => ($b$jscomp$5_buffer$jscomp$44$$ = $GL$buffers$$[$b$jscomp$5_buffer$jscomp$44$$]) ? $GLctx$$.isBuffer($b$jscomp$5_buffer$jscomp$44$$) : 0, emscripten_glIsEnabled:$x0$jscomp$23$$ => $GLctx$$.isEnabled($x0$jscomp$23$$), emscripten_glIsFramebuffer:$fb_framebuffer$jscomp$3$$ => ($fb_framebuffer$jscomp$3$$ = $GL$framebuffers$$[$fb_framebuffer$jscomp$3$$]) ? 
$GLctx$$.isFramebuffer($fb_framebuffer$jscomp$3$$) : 0, emscripten_glIsProgram:$program$jscomp$80$$ => ($program$jscomp$80$$ = $GL$programs$$[$program$jscomp$80$$]) ? $GLctx$$.isProgram($program$jscomp$80$$) : 0, emscripten_glIsQueryEXT:$id$jscomp$28_query$jscomp$17$$ => ($id$jscomp$28_query$jscomp$17$$ = $GL$queries$$[$id$jscomp$28_query$jscomp$17$$]) ? $GLctx$$.$disjointTimerQueryExt$.isQueryEXT($id$jscomp$28_query$jscomp$17$$) : 0, emscripten_glIsRenderbuffer:$rb_renderbuffer$jscomp$5$$ => ($rb_renderbuffer$jscomp$5$$ = 
$GL$renderbuffers$$[$rb_renderbuffer$jscomp$5$$]) ? $GLctx$$.isRenderbuffer($rb_renderbuffer$jscomp$5$$) : 0, emscripten_glIsShader:$s$jscomp$7_shader$jscomp$18$$ => ($s$jscomp$7_shader$jscomp$18$$ = $GL$shaders$$[$s$jscomp$7_shader$jscomp$18$$]) ? $GLctx$$.isShader($s$jscomp$7_shader$jscomp$18$$) : 0, emscripten_glIsTexture:$id$jscomp$29_texture$jscomp$10$$ => ($id$jscomp$29_texture$jscomp$10$$ = $GL$textures$$[$id$jscomp$29_texture$jscomp$10$$]) ? $GLctx$$.isTexture($id$jscomp$29_texture$jscomp$10$$) : 
0, emscripten_glIsVertexArrayOES:$array$jscomp$6_vao$jscomp$4$$ => ($array$jscomp$6_vao$jscomp$4$$ = $GL$vaos$$[$array$jscomp$6_vao$jscomp$4$$]) ? $GLctx$$.isVertexArray($array$jscomp$6_vao$jscomp$4$$) : 0, emscripten_glLineWidth:$x0$jscomp$24$$ => $GLctx$$.lineWidth($x0$jscomp$24$$), emscripten_glLinkProgram:$program$jscomp$81$$ => {
  $program$jscomp$81$$ = $GL$programs$$[$program$jscomp$81$$];
  $GLctx$$.linkProgram($program$jscomp$81$$);
  $program$jscomp$81$$.$uniformLocsById$ = 0;
  $program$jscomp$81$$.$uniformSizeAndIdsByName$ = {};
}, emscripten_glPixelStorei:($pname$jscomp$39$$, $param$jscomp$11$$) => {
  3317 == $pname$jscomp$39$$ ? $GL$unpackAlignment$$ = $param$jscomp$11$$ : 3314 == $pname$jscomp$39$$ && ($GL$unpackRowLength$$ = $param$jscomp$11$$);
  $GLctx$$.pixelStorei($pname$jscomp$39$$, $param$jscomp$11$$);
}, emscripten_glPolygonModeWEBGL:($face$jscomp$3$$, $mode$jscomp$60$$) => {
  $GLctx$$.$webglPolygonMode$.polygonModeWEBGL($face$jscomp$3$$, $mode$jscomp$60$$);
}, emscripten_glPolygonOffset:($x0$jscomp$25$$, $x1$jscomp$14$$) => $GLctx$$.polygonOffset($x0$jscomp$25$$, $x1$jscomp$14$$), emscripten_glPolygonOffsetClampEXT:($factor$jscomp$2$$, $units$jscomp$1$$, $clamp$$) => {
  $GLctx$$.$extPolygonOffsetClamp$.polygonOffsetClampEXT($factor$jscomp$2$$, $units$jscomp$1$$, $clamp$$);
}, emscripten_glQueryCounterEXT:($id$jscomp$30$$, $target$jscomp$122$$) => {
  $GLctx$$.$disjointTimerQueryExt$.queryCounterEXT($GL$queries$$[$id$jscomp$30$$], $target$jscomp$122$$);
}, emscripten_glReadPixels:($x$jscomp$95$$, $y$jscomp$80$$, $width$jscomp$40$$, $height$jscomp$35$$, $format$jscomp$23$$, $type$jscomp$187$$, $pixelData_pixels$jscomp$2$$) => {
  ($pixelData_pixels$jscomp$2$$ = $emscriptenWebGLGetTexPixelData$$($type$jscomp$187$$, $format$jscomp$23$$, $width$jscomp$40$$, $height$jscomp$35$$, $pixelData_pixels$jscomp$2$$)) ? $GLctx$$.readPixels($x$jscomp$95$$, $y$jscomp$80$$, $width$jscomp$40$$, $height$jscomp$35$$, $format$jscomp$23$$, $type$jscomp$187$$, $pixelData_pixels$jscomp$2$$) : $GL$lastError$$ ||= 1280;
}, emscripten_glReleaseShaderCompiler:() => {
}, emscripten_glRenderbufferStorage:($x0$jscomp$26$$, $x1$jscomp$15$$, $x2$jscomp$8$$, $x3$jscomp$5$$) => $GLctx$$.renderbufferStorage($x0$jscomp$26$$, $x1$jscomp$15$$, $x2$jscomp$8$$, $x3$jscomp$5$$), emscripten_glSampleCoverage:($value$jscomp$130$$, $invert$jscomp$1$$) => {
  $GLctx$$.sampleCoverage($value$jscomp$130$$, !!$invert$jscomp$1$$);
}, emscripten_glScissor:($x0$jscomp$27$$, $x1$jscomp$16$$, $x2$jscomp$9$$, $x3$jscomp$6$$) => $GLctx$$.scissor($x0$jscomp$27$$, $x1$jscomp$16$$, $x2$jscomp$9$$, $x3$jscomp$6$$), emscripten_glShaderBinary:() => {
  $GL$lastError$$ ||= 1280;
}, emscripten_glShaderSource:($shader$jscomp$19$$, $count$jscomp$48$$, $string$jscomp$15$$, $length$jscomp$56$$) => {
  for (var $source$jscomp$inline_395$$ = "", $i$jscomp$inline_396$$ = 0; $i$jscomp$inline_396$$ < $count$jscomp$48$$; ++$i$jscomp$inline_396$$) {
    $source$jscomp$inline_395$$ += $UTF8ToString$$($HEAPU32$$[$string$jscomp$15$$ + 4 * $i$jscomp$inline_396$$ >> 2], $length$jscomp$56$$ ? $HEAPU32$$[$length$jscomp$56$$ + 4 * $i$jscomp$inline_396$$ >> 2] : void 0);
  }
  $GLctx$$.shaderSource($GL$shaders$$[$shader$jscomp$19$$], $source$jscomp$inline_395$$);
}, emscripten_glStencilFunc:($x0$jscomp$28$$, $x1$jscomp$17$$, $x2$jscomp$10$$) => $GLctx$$.stencilFunc($x0$jscomp$28$$, $x1$jscomp$17$$, $x2$jscomp$10$$), emscripten_glStencilFuncSeparate:($x0$jscomp$29$$, $x1$jscomp$18$$, $x2$jscomp$11$$, $x3$jscomp$7$$) => $GLctx$$.stencilFuncSeparate($x0$jscomp$29$$, $x1$jscomp$18$$, $x2$jscomp$11$$, $x3$jscomp$7$$), emscripten_glStencilMask:$x0$jscomp$30$$ => $GLctx$$.stencilMask($x0$jscomp$30$$), emscripten_glStencilMaskSeparate:($x0$jscomp$31$$, $x1$jscomp$19$$) => 
$GLctx$$.stencilMaskSeparate($x0$jscomp$31$$, $x1$jscomp$19$$), emscripten_glStencilOp:($x0$jscomp$32$$, $x1$jscomp$20$$, $x2$jscomp$12$$) => $GLctx$$.stencilOp($x0$jscomp$32$$, $x1$jscomp$20$$, $x2$jscomp$12$$), emscripten_glStencilOpSeparate:($x0$jscomp$33$$, $x1$jscomp$21$$, $x2$jscomp$13$$, $x3$jscomp$8$$) => $GLctx$$.stencilOpSeparate($x0$jscomp$33$$, $x1$jscomp$21$$, $x2$jscomp$13$$, $x3$jscomp$8$$), emscripten_glTexImage2D:($target$jscomp$123$$, $level$jscomp$22$$, $internalFormat$jscomp$2$$, 
$width$jscomp$41$$, $height$jscomp$36$$, $border$jscomp$6$$, $format$jscomp$24$$, $type$jscomp$188$$, $pixelData$jscomp$1_pixels$jscomp$3$$) => {
  $pixelData$jscomp$1_pixels$jscomp$3$$ = $pixelData$jscomp$1_pixels$jscomp$3$$ ? $emscriptenWebGLGetTexPixelData$$($type$jscomp$188$$, $format$jscomp$24$$, $width$jscomp$41$$, $height$jscomp$36$$, $pixelData$jscomp$1_pixels$jscomp$3$$) : null;
  $GLctx$$.texImage2D($target$jscomp$123$$, $level$jscomp$22$$, $internalFormat$jscomp$2$$, $width$jscomp$41$$, $height$jscomp$36$$, $border$jscomp$6$$, $format$jscomp$24$$, $type$jscomp$188$$, $pixelData$jscomp$1_pixels$jscomp$3$$);
}, emscripten_glTexParameterf:($x0$jscomp$34$$, $x1$jscomp$22$$, $x2$jscomp$14$$) => $GLctx$$.texParameterf($x0$jscomp$34$$, $x1$jscomp$22$$, $x2$jscomp$14$$), emscripten_glTexParameterfv:($target$jscomp$124$$, $pname$jscomp$40$$, $params$jscomp$14$$) => {
  $GLctx$$.texParameterf($target$jscomp$124$$, $pname$jscomp$40$$, $HEAPF32$$[$params$jscomp$14$$ >> 2]);
}, emscripten_glTexParameteri:($x0$jscomp$35$$, $x1$jscomp$23$$, $x2$jscomp$15$$) => $GLctx$$.texParameteri($x0$jscomp$35$$, $x1$jscomp$23$$, $x2$jscomp$15$$), emscripten_glTexParameteriv:($target$jscomp$125$$, $pname$jscomp$41$$, $params$jscomp$15$$) => {
  $GLctx$$.texParameteri($target$jscomp$125$$, $pname$jscomp$41$$, $HEAP32$$[$params$jscomp$15$$ >> 2]);
}, emscripten_glTexSubImage2D:($target$jscomp$126$$, $level$jscomp$23$$, $xoffset$jscomp$9$$, $yoffset$jscomp$9$$, $width$jscomp$42$$, $height$jscomp$37$$, $format$jscomp$25$$, $type$jscomp$189$$, $pixelData$jscomp$2_pixels$jscomp$4$$) => {
  $pixelData$jscomp$2_pixels$jscomp$4$$ = $pixelData$jscomp$2_pixels$jscomp$4$$ ? $emscriptenWebGLGetTexPixelData$$($type$jscomp$189$$, $format$jscomp$25$$, $width$jscomp$42$$, $height$jscomp$37$$, $pixelData$jscomp$2_pixels$jscomp$4$$) : null;
  $GLctx$$.texSubImage2D($target$jscomp$126$$, $level$jscomp$23$$, $xoffset$jscomp$9$$, $yoffset$jscomp$9$$, $width$jscomp$42$$, $height$jscomp$37$$, $format$jscomp$25$$, $type$jscomp$189$$, $pixelData$jscomp$2_pixels$jscomp$4$$);
}, emscripten_glUniform1f:($location$jscomp$83$$, $v0$jscomp$16$$) => {
  $GLctx$$.uniform1f($webglGetUniformLocation$$($location$jscomp$83$$), $v0$jscomp$16$$);
}, emscripten_glUniform1fv:($location$jscomp$84$$, $count$jscomp$49$$, $value$jscomp$131$$) => {
  if (288 >= $count$jscomp$49$$) {
    for (var $view$jscomp$8$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$49$$], $i$jscomp$52$$ = 0; $i$jscomp$52$$ < $count$jscomp$49$$; ++$i$jscomp$52$$) {
      $view$jscomp$8$$[$i$jscomp$52$$] = $HEAPF32$$[$value$jscomp$131$$ + 4 * $i$jscomp$52$$ >> 2];
    }
  } else {
    $view$jscomp$8$$ = $HEAPF32$$.subarray($value$jscomp$131$$ >> 2, $value$jscomp$131$$ + 4 * $count$jscomp$49$$ >> 2);
  }
  $GLctx$$.uniform1fv($webglGetUniformLocation$$($location$jscomp$84$$), $view$jscomp$8$$);
}, emscripten_glUniform1i:($location$jscomp$85$$, $v0$jscomp$17$$) => {
  $GLctx$$.uniform1i($webglGetUniformLocation$$($location$jscomp$85$$), $v0$jscomp$17$$);
}, emscripten_glUniform1iv:($location$jscomp$86$$, $count$jscomp$50$$, $value$jscomp$132$$) => {
  if (288 >= $count$jscomp$50$$) {
    for (var $view$jscomp$9$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$50$$], $i$jscomp$53$$ = 0; $i$jscomp$53$$ < $count$jscomp$50$$; ++$i$jscomp$53$$) {
      $view$jscomp$9$$[$i$jscomp$53$$] = $HEAP32$$[$value$jscomp$132$$ + 4 * $i$jscomp$53$$ >> 2];
    }
  } else {
    $view$jscomp$9$$ = $HEAP32$$.subarray($value$jscomp$132$$ >> 2, $value$jscomp$132$$ + 4 * $count$jscomp$50$$ >> 2);
  }
  $GLctx$$.uniform1iv($webglGetUniformLocation$$($location$jscomp$86$$), $view$jscomp$9$$);
}, emscripten_glUniform2f:($location$jscomp$87$$, $v0$jscomp$18$$, $v1$jscomp$12$$) => {
  $GLctx$$.uniform2f($webglGetUniformLocation$$($location$jscomp$87$$), $v0$jscomp$18$$, $v1$jscomp$12$$);
}, emscripten_glUniform2fv:($location$jscomp$88$$, $count$jscomp$51$$, $value$jscomp$133$$) => {
  if (144 >= $count$jscomp$51$$) {
    $count$jscomp$51$$ *= 2;
    for (var $view$jscomp$10$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$51$$], $i$jscomp$54$$ = 0; $i$jscomp$54$$ < $count$jscomp$51$$; $i$jscomp$54$$ += 2) {
      $view$jscomp$10$$[$i$jscomp$54$$] = $HEAPF32$$[$value$jscomp$133$$ + 4 * $i$jscomp$54$$ >> 2], $view$jscomp$10$$[$i$jscomp$54$$ + 1] = $HEAPF32$$[$value$jscomp$133$$ + (4 * $i$jscomp$54$$ + 4) >> 2];
    }
  } else {
    $view$jscomp$10$$ = $HEAPF32$$.subarray($value$jscomp$133$$ >> 2, $value$jscomp$133$$ + 8 * $count$jscomp$51$$ >> 2);
  }
  $GLctx$$.uniform2fv($webglGetUniformLocation$$($location$jscomp$88$$), $view$jscomp$10$$);
}, emscripten_glUniform2i:($location$jscomp$89$$, $v0$jscomp$19$$, $v1$jscomp$13$$) => {
  $GLctx$$.uniform2i($webglGetUniformLocation$$($location$jscomp$89$$), $v0$jscomp$19$$, $v1$jscomp$13$$);
}, emscripten_glUniform2iv:($location$jscomp$90$$, $count$jscomp$52$$, $value$jscomp$134$$) => {
  if (144 >= $count$jscomp$52$$) {
    $count$jscomp$52$$ *= 2;
    for (var $view$jscomp$11$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$52$$], $i$jscomp$55$$ = 0; $i$jscomp$55$$ < $count$jscomp$52$$; $i$jscomp$55$$ += 2) {
      $view$jscomp$11$$[$i$jscomp$55$$] = $HEAP32$$[$value$jscomp$134$$ + 4 * $i$jscomp$55$$ >> 2], $view$jscomp$11$$[$i$jscomp$55$$ + 1] = $HEAP32$$[$value$jscomp$134$$ + (4 * $i$jscomp$55$$ + 4) >> 2];
    }
  } else {
    $view$jscomp$11$$ = $HEAP32$$.subarray($value$jscomp$134$$ >> 2, $value$jscomp$134$$ + 8 * $count$jscomp$52$$ >> 2);
  }
  $GLctx$$.uniform2iv($webglGetUniformLocation$$($location$jscomp$90$$), $view$jscomp$11$$);
}, emscripten_glUniform3f:($location$jscomp$91$$, $v0$jscomp$20$$, $v1$jscomp$14$$, $v2$jscomp$8$$) => {
  $GLctx$$.uniform3f($webglGetUniformLocation$$($location$jscomp$91$$), $v0$jscomp$20$$, $v1$jscomp$14$$, $v2$jscomp$8$$);
}, emscripten_glUniform3fv:($location$jscomp$92$$, $count$jscomp$53$$, $value$jscomp$135$$) => {
  if (96 >= $count$jscomp$53$$) {
    $count$jscomp$53$$ *= 3;
    for (var $view$jscomp$12$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$53$$], $i$jscomp$56$$ = 0; $i$jscomp$56$$ < $count$jscomp$53$$; $i$jscomp$56$$ += 3) {
      $view$jscomp$12$$[$i$jscomp$56$$] = $HEAPF32$$[$value$jscomp$135$$ + 4 * $i$jscomp$56$$ >> 2], $view$jscomp$12$$[$i$jscomp$56$$ + 1] = $HEAPF32$$[$value$jscomp$135$$ + (4 * $i$jscomp$56$$ + 4) >> 2], $view$jscomp$12$$[$i$jscomp$56$$ + 2] = $HEAPF32$$[$value$jscomp$135$$ + (4 * $i$jscomp$56$$ + 8) >> 2];
    }
  } else {
    $view$jscomp$12$$ = $HEAPF32$$.subarray($value$jscomp$135$$ >> 2, $value$jscomp$135$$ + 12 * $count$jscomp$53$$ >> 2);
  }
  $GLctx$$.uniform3fv($webglGetUniformLocation$$($location$jscomp$92$$), $view$jscomp$12$$);
}, emscripten_glUniform3i:($location$jscomp$93$$, $v0$jscomp$21$$, $v1$jscomp$15$$, $v2$jscomp$9$$) => {
  $GLctx$$.uniform3i($webglGetUniformLocation$$($location$jscomp$93$$), $v0$jscomp$21$$, $v1$jscomp$15$$, $v2$jscomp$9$$);
}, emscripten_glUniform3iv:($location$jscomp$94$$, $count$jscomp$54$$, $value$jscomp$136$$) => {
  if (96 >= $count$jscomp$54$$) {
    $count$jscomp$54$$ *= 3;
    for (var $view$jscomp$13$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$54$$], $i$jscomp$57$$ = 0; $i$jscomp$57$$ < $count$jscomp$54$$; $i$jscomp$57$$ += 3) {
      $view$jscomp$13$$[$i$jscomp$57$$] = $HEAP32$$[$value$jscomp$136$$ + 4 * $i$jscomp$57$$ >> 2], $view$jscomp$13$$[$i$jscomp$57$$ + 1] = $HEAP32$$[$value$jscomp$136$$ + (4 * $i$jscomp$57$$ + 4) >> 2], $view$jscomp$13$$[$i$jscomp$57$$ + 2] = $HEAP32$$[$value$jscomp$136$$ + (4 * $i$jscomp$57$$ + 8) >> 2];
    }
  } else {
    $view$jscomp$13$$ = $HEAP32$$.subarray($value$jscomp$136$$ >> 2, $value$jscomp$136$$ + 12 * $count$jscomp$54$$ >> 2);
  }
  $GLctx$$.uniform3iv($webglGetUniformLocation$$($location$jscomp$94$$), $view$jscomp$13$$);
}, emscripten_glUniform4f:($location$jscomp$95$$, $v0$jscomp$22$$, $v1$jscomp$16$$, $v2$jscomp$10$$, $v3$jscomp$4$$) => {
  $GLctx$$.uniform4f($webglGetUniformLocation$$($location$jscomp$95$$), $v0$jscomp$22$$, $v1$jscomp$16$$, $v2$jscomp$10$$, $v3$jscomp$4$$);
}, emscripten_glUniform4fv:($location$jscomp$96$$, $count$jscomp$55$$, $value$jscomp$137$$) => {
  if (72 >= $count$jscomp$55$$) {
    var $view$jscomp$14$$ = $miniTempWebGLFloatBuffers$$[4 * $count$jscomp$55$$], $heap$jscomp$3$$ = $HEAPF32$$;
    $value$jscomp$137$$ >>= 2;
    $count$jscomp$55$$ *= 4;
    for (var $i$jscomp$58$$ = 0; $i$jscomp$58$$ < $count$jscomp$55$$; $i$jscomp$58$$ += 4) {
      var $dst$$ = $value$jscomp$137$$ + $i$jscomp$58$$;
      $view$jscomp$14$$[$i$jscomp$58$$] = $heap$jscomp$3$$[$dst$$];
      $view$jscomp$14$$[$i$jscomp$58$$ + 1] = $heap$jscomp$3$$[$dst$$ + 1];
      $view$jscomp$14$$[$i$jscomp$58$$ + 2] = $heap$jscomp$3$$[$dst$$ + 2];
      $view$jscomp$14$$[$i$jscomp$58$$ + 3] = $heap$jscomp$3$$[$dst$$ + 3];
    }
  } else {
    $view$jscomp$14$$ = $HEAPF32$$.subarray($value$jscomp$137$$ >> 2, $value$jscomp$137$$ + 16 * $count$jscomp$55$$ >> 2);
  }
  $GLctx$$.uniform4fv($webglGetUniformLocation$$($location$jscomp$96$$), $view$jscomp$14$$);
}, emscripten_glUniform4i:($location$jscomp$97$$, $v0$jscomp$23$$, $v1$jscomp$17$$, $v2$jscomp$11$$, $v3$jscomp$5$$) => {
  $GLctx$$.uniform4i($webglGetUniformLocation$$($location$jscomp$97$$), $v0$jscomp$23$$, $v1$jscomp$17$$, $v2$jscomp$11$$, $v3$jscomp$5$$);
}, emscripten_glUniform4iv:($location$jscomp$98$$, $count$jscomp$56$$, $value$jscomp$138$$) => {
  if (72 >= $count$jscomp$56$$) {
    $count$jscomp$56$$ *= 4;
    for (var $view$jscomp$15$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$56$$], $i$jscomp$59$$ = 0; $i$jscomp$59$$ < $count$jscomp$56$$; $i$jscomp$59$$ += 4) {
      $view$jscomp$15$$[$i$jscomp$59$$] = $HEAP32$$[$value$jscomp$138$$ + 4 * $i$jscomp$59$$ >> 2], $view$jscomp$15$$[$i$jscomp$59$$ + 1] = $HEAP32$$[$value$jscomp$138$$ + (4 * $i$jscomp$59$$ + 4) >> 2], $view$jscomp$15$$[$i$jscomp$59$$ + 2] = $HEAP32$$[$value$jscomp$138$$ + (4 * $i$jscomp$59$$ + 8) >> 2], $view$jscomp$15$$[$i$jscomp$59$$ + 3] = $HEAP32$$[$value$jscomp$138$$ + (4 * $i$jscomp$59$$ + 12) >> 2];
    }
  } else {
    $view$jscomp$15$$ = $HEAP32$$.subarray($value$jscomp$138$$ >> 2, $value$jscomp$138$$ + 16 * $count$jscomp$56$$ >> 2);
  }
  $GLctx$$.uniform4iv($webglGetUniformLocation$$($location$jscomp$98$$), $view$jscomp$15$$);
}, emscripten_glUniformMatrix2fv:($location$jscomp$99$$, $count$jscomp$57$$, $transpose$jscomp$21$$, $value$jscomp$139$$) => {
  if (72 >= $count$jscomp$57$$) {
    $count$jscomp$57$$ *= 4;
    for (var $view$jscomp$16$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$57$$], $i$jscomp$60$$ = 0; $i$jscomp$60$$ < $count$jscomp$57$$; $i$jscomp$60$$ += 4) {
      $view$jscomp$16$$[$i$jscomp$60$$] = $HEAPF32$$[$value$jscomp$139$$ + 4 * $i$jscomp$60$$ >> 2], $view$jscomp$16$$[$i$jscomp$60$$ + 1] = $HEAPF32$$[$value$jscomp$139$$ + (4 * $i$jscomp$60$$ + 4) >> 2], $view$jscomp$16$$[$i$jscomp$60$$ + 2] = $HEAPF32$$[$value$jscomp$139$$ + (4 * $i$jscomp$60$$ + 8) >> 2], $view$jscomp$16$$[$i$jscomp$60$$ + 3] = $HEAPF32$$[$value$jscomp$139$$ + (4 * $i$jscomp$60$$ + 12) >> 2];
    }
  } else {
    $view$jscomp$16$$ = $HEAPF32$$.subarray($value$jscomp$139$$ >> 2, $value$jscomp$139$$ + 16 * $count$jscomp$57$$ >> 2);
  }
  $GLctx$$.uniformMatrix2fv($webglGetUniformLocation$$($location$jscomp$99$$), !!$transpose$jscomp$21$$, $view$jscomp$16$$);
}, emscripten_glUniformMatrix3fv:($location$jscomp$100$$, $count$jscomp$58$$, $transpose$jscomp$22$$, $value$jscomp$140$$) => {
  if (32 >= $count$jscomp$58$$) {
    $count$jscomp$58$$ *= 9;
    for (var $view$jscomp$17$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$58$$], $i$jscomp$61$$ = 0; $i$jscomp$61$$ < $count$jscomp$58$$; $i$jscomp$61$$ += 9) {
      $view$jscomp$17$$[$i$jscomp$61$$] = $HEAPF32$$[$value$jscomp$140$$ + 4 * $i$jscomp$61$$ >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 1] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 4) >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 2] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 8) >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 3] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 12) >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 4] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 
      16) >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 5] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 20) >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 6] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 24) >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 7] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 28) >> 2], $view$jscomp$17$$[$i$jscomp$61$$ + 8] = $HEAPF32$$[$value$jscomp$140$$ + (4 * $i$jscomp$61$$ + 32) >> 2];
    }
  } else {
    $view$jscomp$17$$ = $HEAPF32$$.subarray($value$jscomp$140$$ >> 2, $value$jscomp$140$$ + 36 * $count$jscomp$58$$ >> 2);
  }
  $GLctx$$.uniformMatrix3fv($webglGetUniformLocation$$($location$jscomp$100$$), !!$transpose$jscomp$22$$, $view$jscomp$17$$);
}, emscripten_glUniformMatrix4fv:($location$jscomp$101$$, $count$jscomp$59$$, $transpose$jscomp$23$$, $value$jscomp$141$$) => {
  if (18 >= $count$jscomp$59$$) {
    var $view$jscomp$18$$ = $miniTempWebGLFloatBuffers$$[16 * $count$jscomp$59$$], $heap$jscomp$4$$ = $HEAPF32$$;
    $value$jscomp$141$$ >>= 2;
    $count$jscomp$59$$ *= 16;
    for (var $i$jscomp$62$$ = 0; $i$jscomp$62$$ < $count$jscomp$59$$; $i$jscomp$62$$ += 16) {
      var $dst$jscomp$1$$ = $value$jscomp$141$$ + $i$jscomp$62$$;
      $view$jscomp$18$$[$i$jscomp$62$$] = $heap$jscomp$4$$[$dst$jscomp$1$$];
      $view$jscomp$18$$[$i$jscomp$62$$ + 1] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 1];
      $view$jscomp$18$$[$i$jscomp$62$$ + 2] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 2];
      $view$jscomp$18$$[$i$jscomp$62$$ + 3] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 3];
      $view$jscomp$18$$[$i$jscomp$62$$ + 4] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 4];
      $view$jscomp$18$$[$i$jscomp$62$$ + 5] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 5];
      $view$jscomp$18$$[$i$jscomp$62$$ + 6] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 6];
      $view$jscomp$18$$[$i$jscomp$62$$ + 7] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 7];
      $view$jscomp$18$$[$i$jscomp$62$$ + 8] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 8];
      $view$jscomp$18$$[$i$jscomp$62$$ + 9] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 9];
      $view$jscomp$18$$[$i$jscomp$62$$ + 10] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 10];
      $view$jscomp$18$$[$i$jscomp$62$$ + 11] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 11];
      $view$jscomp$18$$[$i$jscomp$62$$ + 12] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 12];
      $view$jscomp$18$$[$i$jscomp$62$$ + 13] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 13];
      $view$jscomp$18$$[$i$jscomp$62$$ + 14] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 14];
      $view$jscomp$18$$[$i$jscomp$62$$ + 15] = $heap$jscomp$4$$[$dst$jscomp$1$$ + 15];
    }
  } else {
    $view$jscomp$18$$ = $HEAPF32$$.subarray($value$jscomp$141$$ >> 2, $value$jscomp$141$$ + 64 * $count$jscomp$59$$ >> 2);
  }
  $GLctx$$.uniformMatrix4fv($webglGetUniformLocation$$($location$jscomp$101$$), !!$transpose$jscomp$23$$, $view$jscomp$18$$);
}, emscripten_glUseProgram:$program$jscomp$82$$ => {
  $program$jscomp$82$$ = $GL$programs$$[$program$jscomp$82$$];
  $GLctx$$.useProgram($program$jscomp$82$$);
  $GLctx$$.$currentProgram$ = $program$jscomp$82$$;
}, emscripten_glValidateProgram:$program$jscomp$83$$ => {
  $GLctx$$.validateProgram($GL$programs$$[$program$jscomp$83$$]);
}, emscripten_glVertexAttrib1f:($x0$jscomp$36$$, $x1$jscomp$24$$) => $GLctx$$.vertexAttrib1f($x0$jscomp$36$$, $x1$jscomp$24$$), emscripten_glVertexAttrib1fv:($index$jscomp$114$$, $v$jscomp$4$$) => {
  $GLctx$$.vertexAttrib1f($index$jscomp$114$$, $HEAPF32$$[$v$jscomp$4$$ >> 2]);
}, emscripten_glVertexAttrib2f:($x0$jscomp$37$$, $x1$jscomp$25$$, $x2$jscomp$16$$) => $GLctx$$.vertexAttrib2f($x0$jscomp$37$$, $x1$jscomp$25$$, $x2$jscomp$16$$), emscripten_glVertexAttrib2fv:($index$jscomp$115$$, $v$jscomp$5$$) => {
  $GLctx$$.vertexAttrib2f($index$jscomp$115$$, $HEAPF32$$[$v$jscomp$5$$ >> 2], $HEAPF32$$[$v$jscomp$5$$ + 4 >> 2]);
}, emscripten_glVertexAttrib3f:($x0$jscomp$38$$, $x1$jscomp$26$$, $x2$jscomp$17$$, $x3$jscomp$9$$) => $GLctx$$.vertexAttrib3f($x0$jscomp$38$$, $x1$jscomp$26$$, $x2$jscomp$17$$, $x3$jscomp$9$$), emscripten_glVertexAttrib3fv:($index$jscomp$116$$, $v$jscomp$6$$) => {
  $GLctx$$.vertexAttrib3f($index$jscomp$116$$, $HEAPF32$$[$v$jscomp$6$$ >> 2], $HEAPF32$$[$v$jscomp$6$$ + 4 >> 2], $HEAPF32$$[$v$jscomp$6$$ + 8 >> 2]);
}, emscripten_glVertexAttrib4f:($x0$jscomp$39$$, $x1$jscomp$27$$, $x2$jscomp$18$$, $x3$jscomp$10$$, $x4$jscomp$2$$) => $GLctx$$.vertexAttrib4f($x0$jscomp$39$$, $x1$jscomp$27$$, $x2$jscomp$18$$, $x3$jscomp$10$$, $x4$jscomp$2$$), emscripten_glVertexAttrib4fv:($index$jscomp$117$$, $v$jscomp$7$$) => {
  $GLctx$$.vertexAttrib4f($index$jscomp$117$$, $HEAPF32$$[$v$jscomp$7$$ >> 2], $HEAPF32$$[$v$jscomp$7$$ + 4 >> 2], $HEAPF32$$[$v$jscomp$7$$ + 8 >> 2], $HEAPF32$$[$v$jscomp$7$$ + 12 >> 2]);
}, emscripten_glVertexAttribDivisorANGLE:($index$jscomp$118$$, $divisor$jscomp$4$$) => {
  $GLctx$$.vertexAttribDivisor($index$jscomp$118$$, $divisor$jscomp$4$$);
}, emscripten_glVertexAttribPointer:($index$jscomp$119$$, $size$jscomp$41$$, $type$jscomp$190$$, $normalized$jscomp$2$$, $stride$jscomp$3$$, $ptr$jscomp$23$$) => {
  $GLctx$$.vertexAttribPointer($index$jscomp$119$$, $size$jscomp$41$$, $type$jscomp$190$$, !!$normalized$jscomp$2$$, $stride$jscomp$3$$, $ptr$jscomp$23$$);
}, emscripten_glViewport:($x0$jscomp$40$$, $x1$jscomp$28$$, $x2$jscomp$19$$, $x3$jscomp$11$$) => $GLctx$$.viewport($x0$jscomp$40$$, $x1$jscomp$28$$, $x2$jscomp$19$$, $x3$jscomp$11$$), emscripten_has_asyncify:() => 0, emscripten_request_fullscreen_strategy:($target$jscomp$128$$, $deferUntilInEventHandler$$, $fullscreenStrategy$$) => $doRequestFullscreen$$($target$jscomp$128$$, {$scaleMode$:$HEAP32$$[$fullscreenStrategy$$ >> 2], $canvasResolutionScaleMode$:$HEAP32$$[$fullscreenStrategy$$ + 4 >> 2], 
$filteringMode$:$HEAP32$$[$fullscreenStrategy$$ + 8 >> 2], $deferUntilInEventHandler$:$deferUntilInEventHandler$$, $canvasResizedCallback$:$HEAP32$$[$fullscreenStrategy$$ + 12 >> 2], $canvasResizedCallbackUserData$:$HEAP32$$[$fullscreenStrategy$$ + 16 >> 2]}), emscripten_request_pointerlock:($target$jscomp$129$$, $deferUntilInEventHandler$jscomp$1$$) => {
  $target$jscomp$129$$ = $findEventTarget$$($target$jscomp$129$$);
  return $target$jscomp$129$$ ? $target$jscomp$129$$.requestPointerLock ? $JSCompiler_StaticMethods_canPerformEventHandlerRequests$$() ? $requestPointerLock$$($target$jscomp$129$$) : $deferUntilInEventHandler$jscomp$1$$ ? ($JSCompiler_StaticMethods_deferCall$$($requestPointerLock$$, 2, [$target$jscomp$129$$]), 1) : -2 : -1 : -4;
}, emscripten_resize_heap:$requestedSize$$ => {
  var $oldSize$$ = $HEAPU8$$.length;
  $requestedSize$$ >>>= 0;
  $assert$$($requestedSize$$ > $oldSize$$);
  if (2147483648 < $requestedSize$$) {
    return $err$$(`Cannot enlarge memory, requested ${$requestedSize$$} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var $cutDown$$ = 1; 4 >= $cutDown$$; $cutDown$$ *= 2) {
    var $newSize$jscomp$2_overGrownHeapSize$$ = $oldSize$$ * (1 + 0.2 / $cutDown$$);
    $newSize$jscomp$2_overGrownHeapSize$$ = Math.min($newSize$jscomp$2_overGrownHeapSize$$, $requestedSize$$ + 100663296);
    $newSize$jscomp$2_overGrownHeapSize$$ = Math.min(2147483648, $alignMemory$$(Math.max($requestedSize$$, $newSize$jscomp$2_overGrownHeapSize$$)));
    a: {
      var $size$jscomp$inline_398$$ = $newSize$jscomp$2_overGrownHeapSize$$, $oldHeapSize$jscomp$inline_399$$ = $wasmMemory$$.buffer.byteLength;
      try {
        $wasmMemory$$.grow(($size$jscomp$inline_398$$ - $oldHeapSize$jscomp$inline_399$$ + 65535) / 65536 | 0);
        $updateMemoryViews$$();
        var $JSCompiler_inline_result$jscomp$33$$ = 1;
        break a;
      } catch ($e$jscomp$inline_401$$) {
        $err$$(`growMemory: Attempted to grow heap from ${$oldHeapSize$jscomp$inline_399$$} bytes to ${$size$jscomp$inline_398$$} bytes, but got error: ${$e$jscomp$inline_401$$}`);
      }
      $JSCompiler_inline_result$jscomp$33$$ = void 0;
    }
    if ($JSCompiler_inline_result$jscomp$33$$) {
      return !0;
    }
  }
  $err$$(`Failed to grow the heap from ${$oldSize$$} bytes to ${$newSize$jscomp$2_overGrownHeapSize$$} bytes, not enough memory!`);
  return !1;
}, emscripten_sample_gamepad_data:$_emscripten_sample_gamepad_data$$, emscripten_set_beforeunload_callback_on_thread:($userData$jscomp$1$$, $callbackfunc$jscomp$1$$, $targetThread$$) => "undefined" == typeof onbeforeunload ? -1 : 1 !== $targetThread$$ ? -5 : $registerBeforeUnloadEventCallback$$($userData$jscomp$1$$, $callbackfunc$jscomp$1$$), emscripten_set_blur_callback_on_thread:($target$jscomp$132$$, $userData$jscomp$3$$, $useCapture$jscomp$2$$, $callbackfunc$jscomp$3$$) => $registerFocusEventCallback$$($target$jscomp$132$$, 
$userData$jscomp$3$$, $useCapture$jscomp$2$$, $callbackfunc$jscomp$3$$, 12, "blur"), emscripten_set_canvas_element_size:$_emscripten_set_canvas_element_size$$, emscripten_set_element_css_size:($target$jscomp$133$$, $width$jscomp$43$$, $height$jscomp$38$$) => {
  $target$jscomp$133$$ = $findEventTarget$$($target$jscomp$133$$);
  if (!$target$jscomp$133$$) {
    return -4;
  }
  $target$jscomp$133$$.style.width = $width$jscomp$43$$ + "px";
  $target$jscomp$133$$.style.height = $height$jscomp$38$$ + "px";
  return 0;
}, emscripten_set_focus_callback_on_thread:($target$jscomp$134$$, $userData$jscomp$4$$, $useCapture$jscomp$3$$, $callbackfunc$jscomp$4$$) => $registerFocusEventCallback$$($target$jscomp$134$$, $userData$jscomp$4$$, $useCapture$jscomp$3$$, $callbackfunc$jscomp$4$$, 13, "focus"), emscripten_set_fullscreenchange_callback_on_thread:($target$jscomp$136$$, $userData$jscomp$6$$, $useCapture$jscomp$5$$, $callbackfunc$jscomp$6$$) => {
  if (!$JSEvents$$.fullscreenEnabled()) {
    return -1;
  }
  $target$jscomp$136$$ = $findEventTarget$$($target$jscomp$136$$);
  if (!$target$jscomp$136$$) {
    return -4;
  }
  $registerFullscreenChangeEventCallback$$($target$jscomp$136$$, $userData$jscomp$6$$, $useCapture$jscomp$5$$, $callbackfunc$jscomp$6$$, "webkitfullscreenchange");
  return $registerFullscreenChangeEventCallback$$($target$jscomp$136$$, $userData$jscomp$6$$, $useCapture$jscomp$5$$, $callbackfunc$jscomp$6$$, "fullscreenchange");
}, emscripten_set_gamepadconnected_callback_on_thread:($userData$jscomp$8$$, $useCapture$jscomp$7$$, $callbackfunc$jscomp$8$$) => $_emscripten_sample_gamepad_data$$() ? -1 : $registerGamepadEventCallback$$($userData$jscomp$8$$, $useCapture$jscomp$7$$, $callbackfunc$jscomp$8$$, 26, "gamepadconnected"), emscripten_set_gamepaddisconnected_callback_on_thread:($userData$jscomp$9$$, $useCapture$jscomp$8$$, $callbackfunc$jscomp$9$$) => $_emscripten_sample_gamepad_data$$() ? -1 : $registerGamepadEventCallback$$($userData$jscomp$9$$, 
$useCapture$jscomp$8$$, $callbackfunc$jscomp$9$$, 27, "gamepaddisconnected"), emscripten_set_keydown_callback_on_thread:($target$jscomp$139$$, $userData$jscomp$11$$, $useCapture$jscomp$10$$, $callbackfunc$jscomp$11$$) => $registerKeyEventCallback$$($target$jscomp$139$$, $userData$jscomp$11$$, $useCapture$jscomp$10$$, $callbackfunc$jscomp$11$$, 2, "keydown"), emscripten_set_keypress_callback_on_thread:($target$jscomp$140$$, $userData$jscomp$12$$, $useCapture$jscomp$11$$, $callbackfunc$jscomp$12$$) => 
$registerKeyEventCallback$$($target$jscomp$140$$, $userData$jscomp$12$$, $useCapture$jscomp$11$$, $callbackfunc$jscomp$12$$, 1, "keypress"), emscripten_set_keyup_callback_on_thread:($target$jscomp$141$$, $userData$jscomp$13$$, $useCapture$jscomp$12$$, $callbackfunc$jscomp$13$$) => $registerKeyEventCallback$$($target$jscomp$141$$, $userData$jscomp$13$$, $useCapture$jscomp$12$$, $callbackfunc$jscomp$13$$, 3, "keyup"), emscripten_set_main_loop_arg:($func$jscomp$18$$, $arg$jscomp$13$$, $fps$jscomp$1$$, 
$simulateInfiniteLoop$jscomp$1$$) => {
  $setMainLoop$$(() => $wasmTable$$.get($func$jscomp$18$$)($arg$jscomp$13$$), $fps$jscomp$1$$, $simulateInfiniteLoop$jscomp$1$$, $arg$jscomp$13$$);
}, emscripten_set_mousedown_callback_on_thread:($target$jscomp$144$$, $userData$jscomp$15$$, $useCapture$jscomp$14$$, $callbackfunc$jscomp$15$$) => $registerMouseEventCallback$$($target$jscomp$144$$, $userData$jscomp$15$$, $useCapture$jscomp$14$$, $callbackfunc$jscomp$15$$, 5, "mousedown"), emscripten_set_mouseenter_callback_on_thread:($target$jscomp$145$$, $userData$jscomp$16$$, $useCapture$jscomp$15$$, $callbackfunc$jscomp$16$$) => $registerMouseEventCallback$$($target$jscomp$145$$, $userData$jscomp$16$$, 
$useCapture$jscomp$15$$, $callbackfunc$jscomp$16$$, 33, "mouseenter"), emscripten_set_mouseleave_callback_on_thread:($target$jscomp$146$$, $userData$jscomp$17$$, $useCapture$jscomp$16$$, $callbackfunc$jscomp$17$$) => $registerMouseEventCallback$$($target$jscomp$146$$, $userData$jscomp$17$$, $useCapture$jscomp$16$$, $callbackfunc$jscomp$17$$, 34, "mouseleave"), emscripten_set_mousemove_callback_on_thread:($target$jscomp$147$$, $userData$jscomp$18$$, $useCapture$jscomp$17$$, $callbackfunc$jscomp$18$$) => 
$registerMouseEventCallback$$($target$jscomp$147$$, $userData$jscomp$18$$, $useCapture$jscomp$17$$, $callbackfunc$jscomp$18$$, 8, "mousemove"), emscripten_set_mouseup_callback_on_thread:($target$jscomp$148$$, $userData$jscomp$19$$, $useCapture$jscomp$18$$, $callbackfunc$jscomp$19$$) => $registerMouseEventCallback$$($target$jscomp$148$$, $userData$jscomp$19$$, $useCapture$jscomp$18$$, $callbackfunc$jscomp$19$$, 6, "mouseup"), emscripten_set_pointerlockchange_callback_on_thread:($target$jscomp$150$$, 
$userData$jscomp$21$$, $useCapture$jscomp$20$$, $callbackfunc$jscomp$21$$) => document.body?.requestPointerLock ? ($target$jscomp$150$$ = $findEventTarget$$($target$jscomp$150$$)) ? $registerPointerlockChangeEventCallback$$($target$jscomp$150$$, $userData$jscomp$21$$, $useCapture$jscomp$20$$, $callbackfunc$jscomp$21$$) : -4 : -1, emscripten_set_resize_callback_on_thread:($target$jscomp$152$$, $userData$jscomp$23$$, $useCapture$jscomp$22$$, $callbackfunc$jscomp$23$$) => $registerUiEventCallback$$($target$jscomp$152$$, 
$userData$jscomp$23$$, $useCapture$jscomp$22$$, $callbackfunc$jscomp$23$$), emscripten_set_touchcancel_callback_on_thread:($target$jscomp$154$$, $userData$jscomp$25$$, $useCapture$jscomp$24$$, $callbackfunc$jscomp$25$$) => $registerTouchEventCallback$$($target$jscomp$154$$, $userData$jscomp$25$$, $useCapture$jscomp$24$$, $callbackfunc$jscomp$25$$, 25, "touchcancel"), emscripten_set_touchend_callback_on_thread:($target$jscomp$155$$, $userData$jscomp$26$$, $useCapture$jscomp$25$$, $callbackfunc$jscomp$26$$) => 
$registerTouchEventCallback$$($target$jscomp$155$$, $userData$jscomp$26$$, $useCapture$jscomp$25$$, $callbackfunc$jscomp$26$$, 23, "touchend"), emscripten_set_touchmove_callback_on_thread:($target$jscomp$156$$, $userData$jscomp$27$$, $useCapture$jscomp$26$$, $callbackfunc$jscomp$27$$) => $registerTouchEventCallback$$($target$jscomp$156$$, $userData$jscomp$27$$, $useCapture$jscomp$26$$, $callbackfunc$jscomp$27$$, 24, "touchmove"), emscripten_set_touchstart_callback_on_thread:($target$jscomp$157$$, 
$userData$jscomp$28$$, $useCapture$jscomp$27$$, $callbackfunc$jscomp$28$$) => $registerTouchEventCallback$$($target$jscomp$157$$, $userData$jscomp$28$$, $useCapture$jscomp$27$$, $callbackfunc$jscomp$28$$, 22, "touchstart"), emscripten_set_visibilitychange_callback_on_thread:($userData$jscomp$30$$, $useCapture$jscomp$29$$, $callbackfunc$jscomp$30$$) => $specialHTMLTargets$$[1] ? $registerVisibilityChangeEventCallback$$($userData$jscomp$30$$, $useCapture$jscomp$29$$, $callbackfunc$jscomp$30$$) : -4, 
emscripten_set_wheel_callback_on_thread:($target$jscomp$160$$, $userData$jscomp$32$$, $useCapture$jscomp$31$$, $callbackfunc$jscomp$32$$) => ($target$jscomp$160$$ = $findEventTarget$$($target$jscomp$160$$)) ? "undefined" != typeof $target$jscomp$160$$.onwheel ? $registerWheelEventCallback$$($target$jscomp$160$$, $userData$jscomp$32$$, $useCapture$jscomp$31$$, $callbackfunc$jscomp$32$$) : -1 : -4, emscripten_set_window_title:$title$jscomp$12$$ => document.title = $UTF8ToString$$($title$jscomp$12$$), 
emscripten_sleep:() => {
  throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep";
}, environ_get:($__environ$$, $environ_buf$$) => {
  var $bufSize$jscomp$4$$ = 0, $envp$$ = 0, $string$jscomp$16$$;
  for ($string$jscomp$16$$ of $getEnvStrings$$()) {
    var $ptr$jscomp$24$$ = $environ_buf$$ + $bufSize$jscomp$4$$;
    $HEAPU32$$[$__environ$$ + $envp$$ >> 2] = $ptr$jscomp$24$$;
    $bufSize$jscomp$4$$ += $stringToUTF8$$($string$jscomp$16$$, $ptr$jscomp$24$$, Infinity) + 1;
    $envp$$ += 4;
  }
  return 0;
}, environ_sizes_get:($bufSize$jscomp$5_penviron_count$$, $penviron_buf_size$$) => {
  var $strings$jscomp$1$$ = $getEnvStrings$$();
  $HEAPU32$$[$bufSize$jscomp$5_penviron_count$$ >> 2] = $strings$jscomp$1$$.length;
  $bufSize$jscomp$5_penviron_count$$ = 0;
  for (var $string$jscomp$17$$ of $strings$jscomp$1$$) {
    $bufSize$jscomp$5_penviron_count$$ += $lengthBytesUTF8$$($string$jscomp$17$$) + 1;
  }
  $HEAPU32$$[$penviron_buf_size$$ >> 2] = $bufSize$jscomp$5_penviron_count$$;
  return 0;
}, fd_close:function($fd$jscomp$39$$) {
  try {
    var $stream$jscomp$58$$ = $FS$getStreamChecked$$($fd$jscomp$39$$);
    $FS$close$$($stream$jscomp$58$$);
    return 0;
  } catch ($e$jscomp$57$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$57$$.name) {
      throw $e$jscomp$57$$;
    }
    return $e$jscomp$57$$.$errno$;
  }
}, fd_read:function($fd$jscomp$40_iov$jscomp$inline_404$$, $iov$jscomp$1_ret$jscomp$inline_407$$, $iovcnt$jscomp$1$$, $pnum$$) {
  try {
    a: {
      var $stream$jscomp$inline_403$$ = $FS$getStreamChecked$$($fd$jscomp$40_iov$jscomp$inline_404$$);
      $fd$jscomp$40_iov$jscomp$inline_404$$ = $iov$jscomp$1_ret$jscomp$inline_407$$;
      for (var $offset$jscomp$inline_406$$, $i$jscomp$inline_408$$ = $iov$jscomp$1_ret$jscomp$inline_407$$ = 0; $i$jscomp$inline_408$$ < $iovcnt$jscomp$1$$; $i$jscomp$inline_408$$++) {
        var $ptr$jscomp$inline_409$$ = $HEAPU32$$[$fd$jscomp$40_iov$jscomp$inline_404$$ >> 2], $len$jscomp$inline_410$$ = $HEAPU32$$[$fd$jscomp$40_iov$jscomp$inline_404$$ + 4 >> 2];
        $fd$jscomp$40_iov$jscomp$inline_404$$ += 8;
        var $stream$jscomp$inline_495$$ = $stream$jscomp$inline_403$$, $offset$jscomp$inline_496$$ = $ptr$jscomp$inline_409$$, $length$jscomp$inline_497$$ = $len$jscomp$inline_410$$, $position$jscomp$inline_498$$ = $offset$jscomp$inline_406$$, $buffer$jscomp$inline_499$$ = $HEAP8$$;
        $assert$$(0 <= $offset$jscomp$inline_496$$);
        if (0 > $length$jscomp$inline_497$$ || 0 > $position$jscomp$inline_498$$) {
          throw new $FS$ErrnoError$$(28);
        }
        if (null === $stream$jscomp$inline_495$$.fd) {
          throw new $FS$ErrnoError$$(8);
        }
        if (1 === ($stream$jscomp$inline_495$$.flags & 2097155)) {
          throw new $FS$ErrnoError$$(8);
        }
        if ($FS$isDir$$($stream$jscomp$inline_495$$.node.mode)) {
          throw new $FS$ErrnoError$$(31);
        }
        if (!$stream$jscomp$inline_495$$.$stream_ops$.read) {
          throw new $FS$ErrnoError$$(28);
        }
        var $seeking$jscomp$inline_500$$ = "undefined" != typeof $position$jscomp$inline_498$$;
        if (!$seeking$jscomp$inline_500$$) {
          $position$jscomp$inline_498$$ = $stream$jscomp$inline_495$$.position;
        } else if (!$stream$jscomp$inline_495$$.seekable) {
          throw new $FS$ErrnoError$$(70);
        }
        var $bytesRead$jscomp$inline_501$$ = $stream$jscomp$inline_495$$.$stream_ops$.read($stream$jscomp$inline_495$$, $buffer$jscomp$inline_499$$, $offset$jscomp$inline_496$$, $length$jscomp$inline_497$$, $position$jscomp$inline_498$$);
        $seeking$jscomp$inline_500$$ || ($stream$jscomp$inline_495$$.position += $bytesRead$jscomp$inline_501$$);
        var $curr$jscomp$inline_411$$ = $bytesRead$jscomp$inline_501$$;
        if (0 > $curr$jscomp$inline_411$$) {
          var $num$jscomp$8$$ = -1;
          break a;
        }
        $iov$jscomp$1_ret$jscomp$inline_407$$ += $curr$jscomp$inline_411$$;
        if ($curr$jscomp$inline_411$$ < $len$jscomp$inline_410$$) {
          break;
        }
        "undefined" != typeof $offset$jscomp$inline_406$$ && ($offset$jscomp$inline_406$$ += $curr$jscomp$inline_411$$);
      }
      $num$jscomp$8$$ = $iov$jscomp$1_ret$jscomp$inline_407$$;
    }
    $HEAPU32$$[$pnum$$ >> 2] = $num$jscomp$8$$;
    return 0;
  } catch ($e$jscomp$58$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$58$$.name) {
      throw $e$jscomp$58$$;
    }
    return $e$jscomp$58$$.$errno$;
  }
}, fd_seek:function($fd$jscomp$41$$, $offset$jscomp$90$$, $whence$jscomp$2$$, $newOffset$$) {
  $offset$jscomp$90$$ = -9007199254740992 > $offset$jscomp$90$$ || 9007199254740992 < $offset$jscomp$90$$ ? NaN : Number($offset$jscomp$90$$);
  try {
    if (isNaN($offset$jscomp$90$$)) {
      return 61;
    }
    var $stream$jscomp$61$$ = $FS$getStreamChecked$$($fd$jscomp$41$$);
    $FS$llseek$$($stream$jscomp$61$$, $offset$jscomp$90$$, $whence$jscomp$2$$);
    $HEAP64$$[$newOffset$$ >> 3] = BigInt($stream$jscomp$61$$.position);
    $stream$jscomp$61$$.$getdents$ && 0 === $offset$jscomp$90$$ && 0 === $whence$jscomp$2$$ && ($stream$jscomp$61$$.$getdents$ = null);
    return 0;
  } catch ($e$jscomp$59$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$59$$.name) {
      throw $e$jscomp$59$$;
    }
    return $e$jscomp$59$$.$errno$;
  }
}, fd_write:function($fd$jscomp$42_iov$jscomp$inline_414$$, $iov$jscomp$3_ret$jscomp$inline_417$$, $iovcnt$jscomp$3$$, $pnum$jscomp$1$$) {
  try {
    a: {
      var $stream$jscomp$inline_413$$ = $FS$getStreamChecked$$($fd$jscomp$42_iov$jscomp$inline_414$$);
      $fd$jscomp$42_iov$jscomp$inline_414$$ = $iov$jscomp$3_ret$jscomp$inline_417$$;
      for (var $offset$jscomp$inline_416$$, $i$jscomp$inline_418$$ = $iov$jscomp$3_ret$jscomp$inline_417$$ = 0; $i$jscomp$inline_418$$ < $iovcnt$jscomp$3$$; $i$jscomp$inline_418$$++) {
        var $ptr$jscomp$inline_419$$ = $HEAPU32$$[$fd$jscomp$42_iov$jscomp$inline_414$$ >> 2], $len$jscomp$inline_420$$ = $HEAPU32$$[$fd$jscomp$42_iov$jscomp$inline_414$$ + 4 >> 2];
        $fd$jscomp$42_iov$jscomp$inline_414$$ += 8;
        var $curr$jscomp$inline_421$$ = $FS$write$$($stream$jscomp$inline_413$$, $HEAP8$$, $ptr$jscomp$inline_419$$, $len$jscomp$inline_420$$, $offset$jscomp$inline_416$$);
        if (0 > $curr$jscomp$inline_421$$) {
          var $num$jscomp$9$$ = -1;
          break a;
        }
        $iov$jscomp$3_ret$jscomp$inline_417$$ += $curr$jscomp$inline_421$$;
        if ($curr$jscomp$inline_421$$ < $len$jscomp$inline_420$$) {
          break;
        }
        "undefined" != typeof $offset$jscomp$inline_416$$ && ($offset$jscomp$inline_416$$ += $curr$jscomp$inline_421$$);
      }
      $num$jscomp$9$$ = $iov$jscomp$3_ret$jscomp$inline_417$$;
    }
    $HEAPU32$$[$pnum$jscomp$1$$ >> 2] = $num$jscomp$9$$;
    return 0;
  } catch ($e$jscomp$60$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$60$$.name) {
      throw $e$jscomp$60$$;
    }
    return $e$jscomp$60$$.$errno$;
  }
}, invoke_diii:$invoke_diii$$, invoke_fiii:$invoke_fiii$$, invoke_i:$invoke_i$$, invoke_ii:$invoke_ii$$, invoke_iii:$invoke_iii$$, invoke_iiii:$invoke_iiii$$, invoke_iiiii:$invoke_iiiii$$, invoke_iiiiii:$invoke_iiiiii$$, invoke_iiiiiii:$invoke_iiiiiii$$, invoke_iiiiiiii:$invoke_iiiiiiii$$, invoke_iiiiiiiii:$invoke_iiiiiiiii$$, invoke_iiiiiiiiii:$invoke_iiiiiiiiii$$, invoke_iiiiiiiiiii:$invoke_iiiiiiiiiii$$, invoke_iiiiiiiiiiii:$invoke_iiiiiiiiiiii$$, invoke_iiiiiiiiiiiii:$invoke_iiiiiiiiiiiii$$, 
invoke_ji:$invoke_ji$$, invoke_jiiii:$invoke_jiiii$$, invoke_jiji:$invoke_jiji$$, invoke_v:$invoke_v$$, invoke_vi:$invoke_vi$$, invoke_vii:$invoke_vii$$, invoke_viidiiii:$invoke_viidiiii$$, invoke_viifiiii:$invoke_viifiiii$$, invoke_viii:$invoke_viii$$, invoke_viiidi:$invoke_viiidi$$, invoke_viiifi:$invoke_viiifi$$, invoke_viiii:$invoke_viiii$$, invoke_viiiii:$invoke_viiiii$$, invoke_viiiiii:$invoke_viiiiii$$, invoke_viiiiiii:$invoke_viiiiiii$$, invoke_viiiiiiiiii:$invoke_viiiiiiiiii$$, invoke_viiiiiiiiiiiiiii:$invoke_viiiiiiiiiiiiiii$$, 
invoke_viijjiiii:$invoke_viijjiiii$$};
function $invoke_ii$$($index$jscomp$120$$, $a1$$) {
  var $sp$jscomp$3$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$120$$)($a1$$);
  } catch ($e$jscomp$62$$) {
    $__emscripten_stack_restore$$($sp$jscomp$3$$);
    if (!($e$jscomp$62$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$62$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_v$$($index$jscomp$121$$) {
  var $sp$jscomp$4$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$121$$)();
  } catch ($e$jscomp$63$$) {
    $__emscripten_stack_restore$$($sp$jscomp$4$$);
    if (!($e$jscomp$63$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$63$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_vi$$($index$jscomp$122$$, $a1$jscomp$1$$) {
  var $sp$jscomp$5$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$122$$)($a1$jscomp$1$$);
  } catch ($e$jscomp$64$$) {
    $__emscripten_stack_restore$$($sp$jscomp$5$$);
    if (!($e$jscomp$64$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$64$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_i$$($index$jscomp$123$$) {
  var $sp$jscomp$6$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$123$$)();
  } catch ($e$jscomp$65$$) {
    $__emscripten_stack_restore$$($sp$jscomp$6$$);
    if (!($e$jscomp$65$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$65$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiii$$($index$jscomp$124$$, $a1$jscomp$2$$, $a2$$, $a3$$) {
  var $sp$jscomp$7$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$124$$)($a1$jscomp$2$$, $a2$$, $a3$$);
  } catch ($e$jscomp$66$$) {
    $__emscripten_stack_restore$$($sp$jscomp$7$$);
    if (!($e$jscomp$66$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$66$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iii$$($index$jscomp$125$$, $a1$jscomp$3$$, $a2$jscomp$1$$) {
  var $sp$jscomp$8$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$125$$)($a1$jscomp$3$$, $a2$jscomp$1$$);
  } catch ($e$jscomp$67$$) {
    $__emscripten_stack_restore$$($sp$jscomp$8$$);
    if (!($e$jscomp$67$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$67$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viii$$($index$jscomp$126$$, $a1$jscomp$4$$, $a2$jscomp$2$$, $a3$jscomp$1$$) {
  var $sp$jscomp$9$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$126$$)($a1$jscomp$4$$, $a2$jscomp$2$$, $a3$jscomp$1$$);
  } catch ($e$jscomp$68$$) {
    $__emscripten_stack_restore$$($sp$jscomp$9$$);
    if (!($e$jscomp$68$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$68$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiiii$$($index$jscomp$127$$, $a1$jscomp$5$$, $a2$jscomp$3$$, $a3$jscomp$2$$, $a4$$) {
  var $sp$jscomp$10$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$127$$)($a1$jscomp$5$$, $a2$jscomp$3$$, $a3$jscomp$2$$, $a4$$);
  } catch ($e$jscomp$69$$) {
    $__emscripten_stack_restore$$($sp$jscomp$10$$);
    if (!($e$jscomp$69$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$69$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiii$$($index$jscomp$128$$, $a1$jscomp$6$$, $a2$jscomp$4$$, $a3$jscomp$3$$, $a4$jscomp$1$$) {
  var $sp$jscomp$11$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$128$$)($a1$jscomp$6$$, $a2$jscomp$4$$, $a3$jscomp$3$$, $a4$jscomp$1$$);
  } catch ($e$jscomp$70$$) {
    $__emscripten_stack_restore$$($sp$jscomp$11$$);
    if (!($e$jscomp$70$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$70$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiiiii$$($index$jscomp$129$$, $a1$jscomp$7$$, $a2$jscomp$5$$, $a3$jscomp$4$$, $a4$jscomp$2$$, $a5$$, $a6$$) {
  var $sp$jscomp$12$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$129$$)($a1$jscomp$7$$, $a2$jscomp$5$$, $a3$jscomp$4$$, $a4$jscomp$2$$, $a5$$, $a6$$);
  } catch ($e$jscomp$71$$) {
    $__emscripten_stack_restore$$($sp$jscomp$12$$);
    if (!($e$jscomp$71$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$71$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiiii$$($index$jscomp$130$$, $a1$jscomp$8$$, $a2$jscomp$6$$, $a3$jscomp$5$$, $a4$jscomp$3$$, $a5$jscomp$1$$) {
  var $sp$jscomp$13$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$130$$)($a1$jscomp$8$$, $a2$jscomp$6$$, $a3$jscomp$5$$, $a4$jscomp$3$$, $a5$jscomp$1$$);
  } catch ($e$jscomp$72$$) {
    $__emscripten_stack_restore$$($sp$jscomp$13$$);
    if (!($e$jscomp$72$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$72$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiiiiii$$($index$jscomp$131$$, $a1$jscomp$9$$, $a2$jscomp$7$$, $a3$jscomp$6$$, $a4$jscomp$4$$, $a5$jscomp$2$$, $a6$jscomp$1$$) {
  var $sp$jscomp$14$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$131$$)($a1$jscomp$9$$, $a2$jscomp$7$$, $a3$jscomp$6$$, $a4$jscomp$4$$, $a5$jscomp$2$$, $a6$jscomp$1$$);
  } catch ($e$jscomp$73$$) {
    $__emscripten_stack_restore$$($sp$jscomp$14$$);
    if (!($e$jscomp$73$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$73$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiiiii$$($index$jscomp$132$$, $a1$jscomp$10$$, $a2$jscomp$8$$, $a3$jscomp$7$$, $a4$jscomp$5$$, $a5$jscomp$3$$) {
  var $sp$jscomp$15$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$132$$)($a1$jscomp$10$$, $a2$jscomp$8$$, $a3$jscomp$7$$, $a4$jscomp$5$$, $a5$jscomp$3$$);
  } catch ($e$jscomp$74$$) {
    $__emscripten_stack_restore$$($sp$jscomp$15$$);
    if (!($e$jscomp$74$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$74$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_vii$$($index$jscomp$133$$, $a1$jscomp$11$$, $a2$jscomp$9$$) {
  var $sp$jscomp$16$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$133$$)($a1$jscomp$11$$, $a2$jscomp$9$$);
  } catch ($e$jscomp$75$$) {
    $__emscripten_stack_restore$$($sp$jscomp$16$$);
    if (!($e$jscomp$75$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$75$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiiiiiii$$($index$jscomp$134$$, $a1$jscomp$12$$, $a2$jscomp$10$$, $a3$jscomp$8$$, $a4$jscomp$6$$, $a5$jscomp$4$$, $a6$jscomp$2$$, $a7$$) {
  var $sp$jscomp$17$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$134$$)($a1$jscomp$12$$, $a2$jscomp$10$$, $a3$jscomp$8$$, $a4$jscomp$6$$, $a5$jscomp$4$$, $a6$jscomp$2$$, $a7$$);
  } catch ($e$jscomp$76$$) {
    $__emscripten_stack_restore$$($sp$jscomp$17$$);
    if (!($e$jscomp$76$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$76$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viifiiii$$($index$jscomp$135$$, $a1$jscomp$13$$, $a2$jscomp$11$$, $a3$jscomp$9$$, $a4$jscomp$7$$, $a5$jscomp$5$$, $a6$jscomp$3$$, $a7$jscomp$1$$) {
  var $sp$jscomp$18$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$135$$)($a1$jscomp$13$$, $a2$jscomp$11$$, $a3$jscomp$9$$, $a4$jscomp$7$$, $a5$jscomp$5$$, $a6$jscomp$3$$, $a7$jscomp$1$$);
  } catch ($e$jscomp$77$$) {
    $__emscripten_stack_restore$$($sp$jscomp$18$$);
    if (!($e$jscomp$77$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$77$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viidiiii$$($index$jscomp$136$$, $a1$jscomp$14$$, $a2$jscomp$12$$, $a3$jscomp$10$$, $a4$jscomp$8$$, $a5$jscomp$6$$, $a6$jscomp$4$$, $a7$jscomp$2$$) {
  var $sp$jscomp$19$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$136$$)($a1$jscomp$14$$, $a2$jscomp$12$$, $a3$jscomp$10$$, $a4$jscomp$8$$, $a5$jscomp$6$$, $a6$jscomp$4$$, $a7$jscomp$2$$);
  } catch ($e$jscomp$78$$) {
    $__emscripten_stack_restore$$($sp$jscomp$19$$);
    if (!($e$jscomp$78$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$78$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viijjiiii$$($index$jscomp$137$$, $a1$jscomp$15$$, $a2$jscomp$13$$, $a3$jscomp$11$$, $a4$jscomp$9$$, $a5$jscomp$7$$, $a6$jscomp$5$$, $a7$jscomp$3$$, $a8$$) {
  var $sp$jscomp$20$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$137$$)($a1$jscomp$15$$, $a2$jscomp$13$$, $a3$jscomp$11$$, $a4$jscomp$9$$, $a5$jscomp$7$$, $a6$jscomp$5$$, $a7$jscomp$3$$, $a8$$);
  } catch ($e$jscomp$79$$) {
    $__emscripten_stack_restore$$($sp$jscomp$20$$);
    if (!($e$jscomp$79$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$79$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_ji$$($index$jscomp$138$$, $a1$jscomp$16$$) {
  var $sp$jscomp$21$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$138$$)($a1$jscomp$16$$);
  } catch ($e$jscomp$80$$) {
    $__emscripten_stack_restore$$($sp$jscomp$21$$);
    if (!($e$jscomp$80$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$80$$;
    }
    $_setThrew$$(1, 0);
    return 0n;
  }
}
function $invoke_jiji$$($index$jscomp$139$$, $a1$jscomp$17$$, $a2$jscomp$14$$, $a3$jscomp$12$$) {
  var $sp$jscomp$22$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$139$$)($a1$jscomp$17$$, $a2$jscomp$14$$, $a3$jscomp$12$$);
  } catch ($e$jscomp$81$$) {
    $__emscripten_stack_restore$$($sp$jscomp$22$$);
    if (!($e$jscomp$81$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$81$$;
    }
    $_setThrew$$(1, 0);
    return 0n;
  }
}
function $invoke_iiiiiiiiii$$($index$jscomp$140$$, $a1$jscomp$18$$, $a2$jscomp$15$$, $a3$jscomp$13$$, $a4$jscomp$10$$, $a5$jscomp$8$$, $a6$jscomp$6$$, $a7$jscomp$4$$, $a8$jscomp$1$$, $a9$$) {
  var $sp$jscomp$23$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$140$$)($a1$jscomp$18$$, $a2$jscomp$15$$, $a3$jscomp$13$$, $a4$jscomp$10$$, $a5$jscomp$8$$, $a6$jscomp$6$$, $a7$jscomp$4$$, $a8$jscomp$1$$, $a9$$);
  } catch ($e$jscomp$82$$) {
    $__emscripten_stack_restore$$($sp$jscomp$23$$);
    if (!($e$jscomp$82$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$82$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiiiiiiii$$($index$jscomp$141$$, $a1$jscomp$19$$, $a2$jscomp$16$$, $a3$jscomp$14$$, $a4$jscomp$11$$, $a5$jscomp$9$$, $a6$jscomp$7$$, $a7$jscomp$5$$, $a8$jscomp$2$$) {
  var $sp$jscomp$24$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$141$$)($a1$jscomp$19$$, $a2$jscomp$16$$, $a3$jscomp$14$$, $a4$jscomp$11$$, $a5$jscomp$9$$, $a6$jscomp$7$$, $a7$jscomp$5$$, $a8$jscomp$2$$);
  } catch ($e$jscomp$83$$) {
    $__emscripten_stack_restore$$($sp$jscomp$24$$);
    if (!($e$jscomp$83$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$83$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiifi$$($index$jscomp$142$$, $a1$jscomp$20$$, $a2$jscomp$17$$, $a3$jscomp$15$$, $a4$jscomp$12$$, $a5$jscomp$10$$) {
  var $sp$jscomp$25$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$142$$)($a1$jscomp$20$$, $a2$jscomp$17$$, $a3$jscomp$15$$, $a4$jscomp$12$$, $a5$jscomp$10$$);
  } catch ($e$jscomp$84$$) {
    $__emscripten_stack_restore$$($sp$jscomp$25$$);
    if (!($e$jscomp$84$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$84$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiidi$$($index$jscomp$143$$, $a1$jscomp$21$$, $a2$jscomp$18$$, $a3$jscomp$16$$, $a4$jscomp$13$$, $a5$jscomp$11$$) {
  var $sp$jscomp$26$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$143$$)($a1$jscomp$21$$, $a2$jscomp$18$$, $a3$jscomp$16$$, $a4$jscomp$13$$, $a5$jscomp$11$$);
  } catch ($e$jscomp$85$$) {
    $__emscripten_stack_restore$$($sp$jscomp$26$$);
    if (!($e$jscomp$85$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$85$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiiiiiiiiii$$($index$jscomp$144$$, $a1$jscomp$22$$, $a2$jscomp$19$$, $a3$jscomp$17$$, $a4$jscomp$14$$, $a5$jscomp$12$$, $a6$jscomp$8$$, $a7$jscomp$6$$, $a8$jscomp$3$$, $a9$jscomp$1$$, $a10$$) {
  var $sp$jscomp$27$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$144$$)($a1$jscomp$22$$, $a2$jscomp$19$$, $a3$jscomp$17$$, $a4$jscomp$14$$, $a5$jscomp$12$$, $a6$jscomp$8$$, $a7$jscomp$6$$, $a8$jscomp$3$$, $a9$jscomp$1$$, $a10$$);
  } catch ($e$jscomp$86$$) {
    $__emscripten_stack_restore$$($sp$jscomp$27$$);
    if (!($e$jscomp$86$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$86$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_jiiii$$($index$jscomp$145$$, $a1$jscomp$23$$, $a2$jscomp$20$$, $a3$jscomp$18$$, $a4$jscomp$15$$) {
  var $sp$jscomp$28$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$145$$)($a1$jscomp$23$$, $a2$jscomp$20$$, $a3$jscomp$18$$, $a4$jscomp$15$$);
  } catch ($e$jscomp$87$$) {
    $__emscripten_stack_restore$$($sp$jscomp$28$$);
    if (!($e$jscomp$87$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$87$$;
    }
    $_setThrew$$(1, 0);
    return 0n;
  }
}
function $invoke_iiiiiiiiiiiii$$($index$jscomp$146$$, $a1$jscomp$24$$, $a2$jscomp$21$$, $a3$jscomp$19$$, $a4$jscomp$16$$, $a5$jscomp$13$$, $a6$jscomp$9$$, $a7$jscomp$7$$, $a8$jscomp$4$$, $a9$jscomp$2$$, $a10$jscomp$1$$, $a11$$, $a12$$) {
  var $sp$jscomp$29$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$146$$)($a1$jscomp$24$$, $a2$jscomp$21$$, $a3$jscomp$19$$, $a4$jscomp$16$$, $a5$jscomp$13$$, $a6$jscomp$9$$, $a7$jscomp$7$$, $a8$jscomp$4$$, $a9$jscomp$2$$, $a10$jscomp$1$$, $a11$$, $a12$$);
  } catch ($e$jscomp$88$$) {
    $__emscripten_stack_restore$$($sp$jscomp$29$$);
    if (!($e$jscomp$88$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$88$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_fiii$$($index$jscomp$147$$, $a1$jscomp$25$$, $a2$jscomp$22$$, $a3$jscomp$20$$) {
  var $sp$jscomp$30$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$147$$)($a1$jscomp$25$$, $a2$jscomp$22$$, $a3$jscomp$20$$);
  } catch ($e$jscomp$89$$) {
    $__emscripten_stack_restore$$($sp$jscomp$30$$);
    if (!($e$jscomp$89$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$89$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_diii$$($index$jscomp$148$$, $a1$jscomp$26$$, $a2$jscomp$23$$, $a3$jscomp$21$$) {
  var $sp$jscomp$31$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$148$$)($a1$jscomp$26$$, $a2$jscomp$23$$, $a3$jscomp$21$$);
  } catch ($e$jscomp$90$$) {
    $__emscripten_stack_restore$$($sp$jscomp$31$$);
    if (!($e$jscomp$90$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$90$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiiiiii$$($index$jscomp$149$$, $a1$jscomp$27$$, $a2$jscomp$24$$, $a3$jscomp$22$$, $a4$jscomp$17$$, $a5$jscomp$14$$, $a6$jscomp$10$$, $a7$jscomp$8$$) {
  var $sp$jscomp$32$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$149$$)($a1$jscomp$27$$, $a2$jscomp$24$$, $a3$jscomp$22$$, $a4$jscomp$17$$, $a5$jscomp$14$$, $a6$jscomp$10$$, $a7$jscomp$8$$);
  } catch ($e$jscomp$91$$) {
    $__emscripten_stack_restore$$($sp$jscomp$32$$);
    if (!($e$jscomp$91$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$91$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_iiiiiiiiiiii$$($index$jscomp$150$$, $a1$jscomp$28$$, $a2$jscomp$25$$, $a3$jscomp$23$$, $a4$jscomp$18$$, $a5$jscomp$15$$, $a6$jscomp$11$$, $a7$jscomp$9$$, $a8$jscomp$5$$, $a9$jscomp$3$$, $a10$jscomp$2$$, $a11$jscomp$1$$) {
  var $sp$jscomp$33$$ = $_emscripten_stack_get_current$$();
  try {
    return $wasmTable$$.get($index$jscomp$150$$)($a1$jscomp$28$$, $a2$jscomp$25$$, $a3$jscomp$23$$, $a4$jscomp$18$$, $a5$jscomp$15$$, $a6$jscomp$11$$, $a7$jscomp$9$$, $a8$jscomp$5$$, $a9$jscomp$3$$, $a10$jscomp$2$$, $a11$jscomp$1$$);
  } catch ($e$jscomp$92$$) {
    $__emscripten_stack_restore$$($sp$jscomp$33$$);
    if (!($e$jscomp$92$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$92$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiiiiiiiii$$($index$jscomp$151$$, $a1$jscomp$29$$, $a2$jscomp$26$$, $a3$jscomp$24$$, $a4$jscomp$19$$, $a5$jscomp$16$$, $a6$jscomp$12$$, $a7$jscomp$10$$, $a8$jscomp$6$$, $a9$jscomp$4$$, $a10$jscomp$3$$) {
  var $sp$jscomp$34$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$151$$)($a1$jscomp$29$$, $a2$jscomp$26$$, $a3$jscomp$24$$, $a4$jscomp$19$$, $a5$jscomp$16$$, $a6$jscomp$12$$, $a7$jscomp$10$$, $a8$jscomp$6$$, $a9$jscomp$4$$, $a10$jscomp$3$$);
  } catch ($e$jscomp$93$$) {
    $__emscripten_stack_restore$$($sp$jscomp$34$$);
    if (!($e$jscomp$93$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$93$$;
    }
    $_setThrew$$(1, 0);
  }
}
function $invoke_viiiiiiiiiiiiiii$$($index$jscomp$152$$, $a1$jscomp$30$$, $a2$jscomp$27$$, $a3$jscomp$25$$, $a4$jscomp$20$$, $a5$jscomp$17$$, $a6$jscomp$13$$, $a7$jscomp$11$$, $a8$jscomp$7$$, $a9$jscomp$5$$, $a10$jscomp$4$$, $a11$jscomp$2$$, $a12$jscomp$1$$, $a13$$, $a14$$, $a15$$) {
  var $sp$jscomp$35$$ = $_emscripten_stack_get_current$$();
  try {
    $wasmTable$$.get($index$jscomp$152$$)($a1$jscomp$30$$, $a2$jscomp$27$$, $a3$jscomp$25$$, $a4$jscomp$20$$, $a5$jscomp$17$$, $a6$jscomp$13$$, $a7$jscomp$11$$, $a8$jscomp$7$$, $a9$jscomp$5$$, $a10$jscomp$4$$, $a11$jscomp$2$$, $a12$jscomp$1$$, $a13$$, $a14$$, $a15$$);
  } catch ($e$jscomp$94$$) {
    $__emscripten_stack_restore$$($sp$jscomp$35$$);
    if (!($e$jscomp$94$$ instanceof $EmscriptenEH$$)) {
      throw $e$jscomp$94$$;
    }
    $_setThrew$$(1, 0);
  }
}
var $calledRun$$;
function $callMain$$($args$jscomp$19$$ = []) {
  $assert$$(0 == $runDependencies$$, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  $assert$$("undefined" === typeof $onPreRuns$$ || 0 == $onPreRuns$$.length, "cannot call main when preRun functions remain to be called");
  var $entryFunction$$ = $_main$$;
  $args$jscomp$19$$.unshift($thisProgram$$);
  var $argc$$ = $args$jscomp$19$$.length, $argv$$ = $__emscripten_stack_alloc$$(4 * ($argc$$ + 1)), $argv_ptr$$ = $argv$$;
  $args$jscomp$19$$.forEach($arg$jscomp$14$$ => {
    $HEAPU32$$[$argv_ptr$$ >> 2] = $stringToUTF8OnStack$$($arg$jscomp$14$$);
    $argv_ptr$$ += 4;
  });
  $HEAPU32$$[$argv_ptr$$ >> 2] = 0;
  try {
    var $ret$jscomp$19$$ = $entryFunction$$($argc$$, $argv$$);
    $exitJS$$($ret$jscomp$19$$, !0);
  } catch ($e$jscomp$95$$) {
    $handleException$$($e$jscomp$95$$);
  }
}
function $run$$($args$jscomp$20$$ = $arguments_$$) {
  function $doRun$$() {
    $assert$$(!$calledRun$$);
    $calledRun$$ = !0;
    $Module$$.calledRun = !0;
    if (!$ABORT$$) {
      $assert$$(!$runtimeInitialized$$);
      $runtimeInitialized$$ = !0;
      $checkStackCookie$$();
      if (!$Module$$.noFSInit && !$FS$initialized$$) {
        $assert$$(!$FS$initialized$$, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        $FS$initialized$$ = !0;
        $input$jscomp$inline_569_input$jscomp$inline_572_stdout$jscomp$inline_576$$ ??= $Module$$.stdin;
        $output$jscomp$inline_570_output$jscomp$inline_573_stderr$jscomp$inline_577$$ ??= $Module$$.stdout;
        $cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$ ??= $Module$$.stderr;
        $input$jscomp$inline_569_input$jscomp$inline_572_stdout$jscomp$inline_576$$ ? $FS$createDevice$$("/dev", "stdin", $input$jscomp$inline_569_input$jscomp$inline_572_stdout$jscomp$inline_576$$) : $FS$symlink$$("/dev/tty", "/dev/stdin");
        $output$jscomp$inline_570_output$jscomp$inline_573_stderr$jscomp$inline_577$$ ? $FS$createDevice$$("/dev", "stdout", null, $output$jscomp$inline_570_output$jscomp$inline_573_stderr$jscomp$inline_577$$) : $FS$symlink$$("/dev/tty", "/dev/stdout");
        $cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$ ? $FS$createDevice$$("/dev", "stderr", null, $cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$) : $FS$symlink$$("/dev/tty1", "/dev/stderr");
        var $cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$ = $FS$open$$("/dev/stdin", 0);
        var $input$jscomp$inline_569_input$jscomp$inline_572_stdout$jscomp$inline_576$$ = $FS$open$$("/dev/stdout", 1);
        var $output$jscomp$inline_570_output$jscomp$inline_573_stderr$jscomp$inline_577$$ = $FS$open$$("/dev/stderr", 1);
        $assert$$(0 === $cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$.fd, `invalid handle for stdin (${$cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$.fd})`);
        $assert$$(1 === $input$jscomp$inline_569_input$jscomp$inline_572_stdout$jscomp$inline_576$$.fd, `invalid handle for stdout (${$input$jscomp$inline_569_input$jscomp$inline_572_stdout$jscomp$inline_576$$.fd})`);
        $assert$$(2 === $output$jscomp$inline_570_output$jscomp$inline_573_stderr$jscomp$inline_577$$.fd, `invalid handle for stderr (${$output$jscomp$inline_570_output$jscomp$inline_573_stderr$jscomp$inline_577$$.fd})`);
      }
      $wasmExports$$.__wasm_call_ctors();
      $FS$ignorePermissions$$ = !1;
      $checkStackCookie$$();
      $Module$$.onRuntimeInitialized?.();
      $consumedModuleProp$$("onRuntimeInitialized");
      $Module$$.noInitialRun || $callMain$$($args$jscomp$20$$);
      $checkStackCookie$$();
      if ($Module$$.postRun) {
        for ("function" == typeof $Module$$.postRun && ($Module$$.postRun = [$Module$$.postRun]); $Module$$.postRun.length;) {
          $cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$ = $Module$$.postRun.shift(), $onPostRuns$$.push($cb$jscomp$inline_579_error$jscomp$inline_571_error$jscomp$inline_574_stdin$jscomp$inline_575$$);
        }
      }
      $consumedModuleProp$$("postRun");
      $callRuntimeCallbacks$$($onPostRuns$$);
    }
  }
  if (0 < $runDependencies$$) {
    $dependenciesFulfilled$$ = $run$$;
  } else {
    $_emscripten_stack_init$$();
    $writeStackCookie$$();
    if ($Module$$.preRun) {
      for ("function" == typeof $Module$$.preRun && ($Module$$.preRun = [$Module$$.preRun]); $Module$$.preRun.length;) {
        $addOnPreRun$$();
      }
    }
    $consumedModuleProp$$("preRun");
    $callRuntimeCallbacks$$($onPreRuns$$);
    0 < $runDependencies$$ ? $dependenciesFulfilled$$ = $run$$ : ($Module$$.setStatus ? ($Module$$.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => $Module$$.setStatus(""), 1);
      $doRun$$();
    }, 1)) : $doRun$$(), $checkStackCookie$$());
  }
}
function $checkUnflushedContent$$() {
  var $oldOut$$ = $out$$, $oldErr$$ = $err$$, $has$$ = !1;
  $out$$ = $err$$ = () => {
    $has$$ = !0;
  };
  try {
    $_fflush$$(0), ["stdout", "stderr"].forEach($name$jscomp$131_path$jscomp$inline_428$$ => {
      $name$jscomp$131_path$jscomp$inline_428$$ = "/dev/" + $name$jscomp$131_path$jscomp$inline_428$$;
      try {
        var $lookup$jscomp$inline_430$$ = $FS$lookupPath$$($name$jscomp$131_path$jscomp$inline_428$$, {$follow$:!0});
        $name$jscomp$131_path$jscomp$inline_428$$ = $lookup$jscomp$inline_430$$.path;
      } catch ($e$jscomp$inline_432$$) {
      }
      var $ret$jscomp$inline_431$$ = {$isRoot$:!1, exists:!1, error:0, name:null, path:null, object:null, $parentExists$:!1, $parentPath$:null, $parentObject$:null};
      try {
        $lookup$jscomp$inline_430$$ = $FS$lookupPath$$($name$jscomp$131_path$jscomp$inline_428$$, {parent:!0}), $ret$jscomp$inline_431$$.$parentExists$ = !0, $ret$jscomp$inline_431$$.$parentPath$ = $lookup$jscomp$inline_430$$.path, $ret$jscomp$inline_431$$.$parentObject$ = $lookup$jscomp$inline_430$$.node, $ret$jscomp$inline_431$$.name = $PATH$basename$$($name$jscomp$131_path$jscomp$inline_428$$), $lookup$jscomp$inline_430$$ = $FS$lookupPath$$($name$jscomp$131_path$jscomp$inline_428$$, {$follow$:!0}), 
        $ret$jscomp$inline_431$$.exists = !0, $ret$jscomp$inline_431$$.path = $lookup$jscomp$inline_430$$.path, $ret$jscomp$inline_431$$.object = $lookup$jscomp$inline_430$$.node, $ret$jscomp$inline_431$$.name = $lookup$jscomp$inline_430$$.node.name, $ret$jscomp$inline_431$$.$isRoot$ = "/" === $lookup$jscomp$inline_430$$.path;
      } catch ($e$jscomp$inline_433$$) {
        $ret$jscomp$inline_431$$.error = $e$jscomp$inline_433$$.$errno$;
      }
      $ret$jscomp$inline_431$$ && $TTY$ttys$$[$ret$jscomp$inline_431$$.object.rdev]?.output?.length && ($has$$ = !0);
    });
  } catch ($e$jscomp$96$$) {
  }
  $out$$ = $oldOut$$;
  $err$$ = $oldErr$$;
  $has$$ && $warnOnce$$("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
}
var $wasmExports$$;
(async function() {
  function $receiveInstance$$($instance$jscomp$1_wasmExports$jscomp$inline_435$$) {
    $wasmExports$$ = $instance$jscomp$1_wasmExports$jscomp$inline_435$$.exports;
    $wasmMemory$$ = $wasmExports$$.memory;
    $assert$$($wasmMemory$$, "memory not found in wasm exports");
    $updateMemoryViews$$();
    $wasmTable$$ = $wasmExports$$.__indirect_function_table;
    $assert$$($wasmTable$$, "table not found in wasm exports");
    $instance$jscomp$1_wasmExports$jscomp$inline_435$$ = $wasmExports$$;
    $Module$$._main = $_main$$ = $createExportWrapper$$("__main_argc_argv", 2);
    $_free$$ = $createExportWrapper$$("free", 1);
    $_malloc$$ = $createExportWrapper$$("malloc", 1);
    $_strerror$$ = $createExportWrapper$$("strerror", 1);
    $_fflush$$ = $createExportWrapper$$("fflush", 1);
    $_fileno$$ = $createExportWrapper$$("fileno", 1);
    $_emscripten_stack_get_end$$ = $instance$jscomp$1_wasmExports$jscomp$inline_435$$.emscripten_stack_get_end;
    $_emscripten_builtin_memalign$$ = $createExportWrapper$$("emscripten_builtin_memalign", 2);
    $_setThrew$$ = $createExportWrapper$$("setThrew", 2);
    $__emscripten_tempret_set$$ = $createExportWrapper$$("_emscripten_tempret_set", 1);
    $_emscripten_stack_init$$ = $instance$jscomp$1_wasmExports$jscomp$inline_435$$.emscripten_stack_init;
    $__emscripten_stack_restore$$ = $instance$jscomp$1_wasmExports$jscomp$inline_435$$._emscripten_stack_restore;
    $__emscripten_stack_alloc$$ = $instance$jscomp$1_wasmExports$jscomp$inline_435$$._emscripten_stack_alloc;
    $_emscripten_stack_get_current$$ = $instance$jscomp$1_wasmExports$jscomp$inline_435$$.emscripten_stack_get_current;
    $___cxa_increment_exception_refcount$$ = $createExportWrapper$$("__cxa_increment_exception_refcount", 1);
    $___cxa_decrement_exception_refcount$$ = $createExportWrapper$$("__cxa_decrement_exception_refcount", 1);
    $___get_exception_message$$ = $createExportWrapper$$("__get_exception_message", 3);
    $___cxa_can_catch$$ = $createExportWrapper$$("__cxa_can_catch", 3);
    $___cxa_get_exception_ptr$$ = $createExportWrapper$$("__cxa_get_exception_ptr", 1);
    $removeRunDependency$$("wasm-instantiate");
    return $wasmExports$$;
  }
  $addRunDependency$$("wasm-instantiate");
  var $trueModule$$ = $Module$$, $info$$ = {env:$wasmImports$$, wasi_snapshot_preview1:$wasmImports$$};
  if ($Module$$.instantiateWasm) {
    return new Promise(($resolve$jscomp$1$$, $reject$jscomp$1$$) => {
      try {
        $Module$$.instantiateWasm($info$$, ($mod$$, $inst$$) => {
          $resolve$jscomp$1$$($receiveInstance$$($mod$$, $inst$$));
        });
      } catch ($e$jscomp$9$$) {
        $err$$(`Module.instantiateWasm callback failed with error: ${$e$jscomp$9$$}`), $reject$jscomp$1$$($e$jscomp$9$$);
      }
    });
  }
  $wasmBinaryFile$$ ??= $Module$$.locateFile ? $Module$$.locateFile("index.wasm", $scriptDirectory$$) : $scriptDirectory$$ + "index.wasm";
  return function($result$jscomp$2$$) {
    $assert$$($Module$$ === $trueModule$$, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    $trueModule$$ = null;
    return $receiveInstance$$($result$jscomp$2$$.instance);
  }(await $instantiateAsync$$($info$$));
})();
$run$$();

