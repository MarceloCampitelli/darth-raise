create or replace
function get_raise_edit(
    	p_value clob)
    return clob is

v_texto clob;
v_palavra 	VARCHAR2(100);
verifica 	varchar2(100);
l_return 	clob;

BEGIN
    v_texto := replace(p_value,chr(13),'');
    FOR i IN 1..REGEXP_COUNT(v_texto, '[^ ]+') LOOP
        verifica := null;
        v_palavra := REGEXP_SUBSTR(v_texto, '[^ ]+', 1, i);

        begin
            select v_palavra into verifica from dual where (v_palavra like '%_p' or v_palavra like '%_w');
        exception
            when others then
                verifica := null;
        end;

        if (verifica is not null) then
            return verifica;
        end if;
    end loop;

return l_return;

end get_raise_edit;
/