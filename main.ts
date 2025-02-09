
//%block="Character number"
//%color="#e8436f"
//%icon="\uf187"
namespace charnum {

    let cidk: { [key: string]: number } = {}

    //%block="$name"
    //%blockId=chrnum_indexkeyshadow
    //%blockHidden=true shim=TD_ID
    //%name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //%name.fieldOptions.key="chrnumIndexKey"
    export function _indexKeyShadow(name: string) {
        return name
    }

    //%blockid=chrnum_startidxkey
    //%block="start index from $name by $start"
    //%name.shadow="chrnum_indexkeyshadow" name.defl="myIdxKey"
    //%group="index key"
    //%weight=10
    export function startIndex(name: string, start: number) {
        cidk[name] = start
    }

    //%blockid=chrnum_getindexkey
    //%block="get $name from index key"
    //%name.shadow="chrnum_indexkeyshadow" name.defl="myIdxKey"
    //%group="index key"
    //%weight=5
    export function getIndexKey(name: string) {
        return cidk[name]
    }

    //%blockid=chrnum_writeandencode
    //%block="write $input"
    //%group="main"
    //%weight=10
    export function write(input: string) {
        let output = "", ct = "", cl = 0, cn = 0
        for (let stv of input.split("")) {
            cn = stv.charCodeAt(0), ct = cn.toString(), cl = ct.length;
            output = "" + output + cl.toString() + cn.toString()
        }
        output = "" + output + "0"
        return output
    }

    //%blockid=chrnum_decode
    //%block="read $input with idx key $name"
    //%name.shadow="chrnum_indexkeyshadow" name.defl="myIdxKey"
    //%group="main"
    //%weight=5
    export function decode(input: string, name: string) {
        for (let v of input.split("")) {
            const nv = parseInt(v)
            if (v != nv.toString()) return ""
        }
        if (cidk[name] == null) return ""
        let output = "", ct = "", cl = 0, cn = 0, cix = cidk[name];
        while (cix < input.length) {
            cl = parseInt(input.charAt(cix)), ct = input.substr(cix + 1, cl)
            cix += (cl + 1), cn = parseInt(ct);
            output = "" + output + String.fromCharCode(cn)
            if ("0".includes(input.charAt(cix))) { break }
        }
        cix += 1, cidk[name] = cix;
        return output
    }

}
