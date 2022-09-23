import camelcase from "camelcase";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { useEffect, useMemo, useState } from "react";

const getSheet = async (
    docId = "1A9ibKGg4ASiIl3PiDix6ASe9Tj55oKAiPuBPJcw7pLg"
) => {
    const doc = new GoogleSpreadsheet(docId);
    /* const storedPrivateKey = window.localStorage.getItem(
    "serviceAccountPrivateKey"
  ); */
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCygyvorkeeGLJf
Lp4pt921gPxjb3sB2IOxNuLJ6e/E1pjCdT0hVR9nvybyA+Uwarc4RSINHbrgX6iA
yISXPCxCsFffnof+cM6HagoTlX04VrJLSTfW8QuuclhsYqw2/l9gtB3UP8q2dN0b
mYFD2gibTnRsfLDc1HVrnjlPueZM574O0mHUDGZoIBuV4iOMJQFbtFA36SBlU4XF
KjtPUmrtCCVAjnifHu1mCIuwjt7JZwCj0IJt6tbdGh0AZdAVETdYJbLE37K3tlW7
IPk44KzNND4TEz+1O5u6CtXHBMWEzryZ4JqkCSlsdxh9KrVFABGpSVYblCJnFONg
jD7ciZ7xAgMBAAECggEADH3VUsDvTgbYZIS0mKK/JvZRsvuYFfb6sCnxEMQH/TQv
GFxv3KdCPVZI+WKAZTTygUOFMHnGG/FVrz1Y2eRiDICehY1oYsuuCBfJgLlTO+AF
NfN3rtjLQnfJ7DuzZV3Detbfx3x3SPFAj6/cNc1KEOQajYTkM2/Cj7dQt12A2hy3
ao/8GvVNyiwUhmts+3ZWa9/hL7M819laRxyk1Dktuv4Z9j8unmgXzIF6s+IyU/JH
W4udTdMEEKy6eLSWl4EYRDQE+M0VPJquymcIf3qxLCp2nhK4DdppIyrIevWarirF
zT0RTngM+88/gzXcZGtH3RESpMy+aaa1Rg3DEQemaQKBgQDXvZeXRANwjuJ+96LA
Rk6zyGXGBrZUE7WsLKXRMirnaCSGfkQr84ZY9MrxEAAjHPE5BcLSH3KPcuuFQDZI
XTn3Ifdg0hUtbKBPUSqT9V4N91idK7TXtlwtNrjvx7h4CSVsVp8kmu7Ev4rODNLv
lZAzykzl2d+TV+cs5SJjXOR6fwKBgQDT0xrvdtYe2er0ygPNnr5q7Q1HyZGqUX54
jRP9/nOoWiOJ+URVg11JDJPy+Scdk91QDmzDGBTPaiNAsy0AZnhBJNwyMhcbP7Ps
c69zhoq77TY9Zh81Y4zCfjBQL2l2PvUfI4AQIV2iMv6jZMRP/ytNKS1a0/5JtMu/
0VJZgCnOjwKBgEQEXCSupr737WTGQiOIhwubZKrYNuevBxnvQaAAxxIJ/WoBqRCK
SJMHKmxx9PkdCNhHfrKsg3vCaYqrQfHyonHN3aZC1bZqhug62MepFiwlDWUQAIX5
0nnWxNukBf6iM5BChw4NYrXZBbQMyvwKFVqerzvQQvK7RgEbhIn7IXWVAoGARDHj
qxJ8LuSDcxmSjeE8dpoou2LWhZnE+LSaqhwASkPyyxm3+TvYjYsCGqhCApC3IG30
b/7RvFD0VoEYzNcwgfCG/5YGwFwK5eX8p1m6UnQ1ESFOjNam23ravQX2kv4D1mmM
ciT7yxtVxW7MkOCapTXLh0FWzY3qRq/yLiRH0VsCgYEAo/qJTdsl6jvzfZfmJCjP
a26HjGJchAxsRn2hOubX8jqeIBUGMu+WiLj7eVIXFVHk4GfuAh5dkNt/SKYg5f6R
vinWLC7QdLoodzIm7cnKnU5GqJBVlbdilohmY/YH2iBvFyANjkiWFJtP1edXcz0t
7v9R6j0XWQCy54hZA2EXrVE=
-----END PRIVATE KEY-----`;

    /* const privateKey =
    storedPrivateKey || window.prompt("Enter service account private key");
  if (!storedPrivateKey && privateKey) {
    window.localStorage.setItem("serviceAccountPrivateKey", privateKey);
  } */
    if (privateKey) {
        await doc
            .useServiceAccountAuth({
                client_email:
                    "prototyping@nothing-to-see-here-game.iam.gserviceaccount.com",
                private_key: privateKey,
            })
            .catch((error: Error) => {
                console.error("auth error", error);
            });

        await doc.loadInfo();

        return doc;
    } else {
        return Promise.reject("private key missing");
    }
};

export const defaultDocId = "1l6_ofHbPLSK8C_fgrxRolynCNcnbHUCmQsyV9Nq3ugo";

type DefaultRow = {
    [key: string]: string | number;
};

const cellValueMap = {
    FALSE: false,
    TRUE: true,
};

export const getRowObjects = <Row extends {} = DefaultRow>(
    rows?: GoogleSpreadsheetRow[],
    defaults: Partial<Row> = {}
) => {
    if (rows && rows[0]) {
        const headers: string[] = rows[0]._sheet.headerValues;
        return rows.map((row) => {
            return headers.reduce((rowData: Partial<Row>, header) => {
                const camelCaseHeader = camelcase(header as string);
                const cellValue = row[header as keyof typeof row];
                if (cellValue !== "") {
                    let formattedCellValue = cellValue;
                    if (!isNaN(Number(cellValue))) {
                        formattedCellValue = Number(cellValue);
                    } else if (cellValue in cellValueMap) {
                        formattedCellValue =
                            cellValueMap[
                                cellValue as keyof typeof cellValueMap
                            ];
                    }
                    rowData[camelCaseHeader as keyof typeof rowData] =
                        formattedCellValue;
                } else if (camelCaseHeader in defaults) {
                    rowData[camelCaseHeader as keyof typeof rowData] =
                        defaults[camelCaseHeader as keyof typeof defaults];
                }
                return rowData;
            }, {}) as Row;
        });
    }
    return undefined;
};

const sheetCache: {
    [key: string]: Promise<GoogleSpreadsheet>;
} = {};

const rowsCache: {
    [key: string]: Promise<GoogleSpreadsheetRow[]>;
} = {};

export const useSheet = (
    docId = defaultDocId,
    sheetIndex = 0
): [GoogleSpreadsheetRow[] | undefined, GoogleSpreadsheet | undefined] => {
    const [doc, setDoc] = useState<GoogleSpreadsheet>();
    const [rows, setRows] = useState<GoogleSpreadsheetRow[]>();

    useEffect(() => {
        let isValid = true;
        const cache = sheetCache[docId];
        const sheetPromise = cache || getSheet(docId);
        if (!cache) {
            sheetCache[docId] = sheetPromise;
        }
        sheetPromise.then(
            (doc) => {
                if (isValid) {
                    setDoc(doc);
                }
            },
            (error) => {
                console.error("error getting the sheet", error);
            }
        );
        return () => {
            isValid = false;
        };
    }, [docId]);

    useEffect(() => {
        let isValid = true;
        if (doc) {
            const rowsCacheKey = `${docId}[${sheetIndex}]`;
            const cache = rowsCache[rowsCacheKey];
            const rowsPromise =
                cache || doc.sheetsByIndex[sheetIndex].getRows();
            if (!cache) {
                rowsCache[rowsCacheKey] = rowsPromise;
            }

            rowsPromise.then(
                (rows) => {
                    if (isValid) {
                        setRows(rows);
                    }
                },
                (error) => {
                    console.error("error getting rows", error);
                }
            );
        }
    }, [doc, docId, sheetIndex]);

    return [rows, doc];
};

const defaultDefaults = {};

export const useSheetObject = <Row extends {} = DefaultRow>(
    docId = defaultDocId,
    sheetIndex = 0,
    defaults: Partial<Row> = defaultDefaults
) => {
    const [rows] = useSheet(docId, sheetIndex);
    const rowObjects = useMemo(
        () => getRowObjects(rows, defaults),
        [rows, defaults]
    );
    return rowObjects;
};
