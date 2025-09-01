import { useEffect } from 'react'
import { initLegacyRuntime } from './legacy/legacy-runtime'

export default function App(){
  useEffect(()=> {
    const teardown = initLegacyRuntime()
    return () => teardown?.()
  }, [])

  return (
    <>
      <header>
        <div className="wrap">
          <div className="toolbar">
            <div className="search">
              <input autoComplete="off" id="q" placeholder="Buscar por modelo, série ou número…" type="search" aria-label="Buscar"/>
            </div>
            <button className="btn" id="addBtn" type="button" aria-expanded="false" aria-controls="editor">Adicionar</button>

            <div id="authBar" style={{display:'flex',gap:'8px',alignItems:'center',marginLeft:'auto'}}>
              <button id="btnSignIn" className="btn ghost" style={{display:'inline-block'}}>Entrar com Google</button>
              <div id="userInfo" style={{display:'none',alignItems:'center',gap:'6px'}}>
                <img id="userPhoto" style={{width:28,height:28,borderRadius:'50%'}} referrerPolicy="no-referrer"/>
                <span id="userName" style={{fontSize:14,opacity:.8 as any}}></span>
                <button id="btnSignOut" className="btn ghost">Sair</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="list"></section>
      <div className="spacer"></div>

      <footer className="footer">
        <div className="wrap">
          <div className="total-pill" id="totais">Total: <span id="chk">0</span> de <span id="all">0</span></div>
          <button className="share-pill" id="shareAll" type="button" aria-label="Compartilhar checklist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/>
              <path d="M16 6l-4-4-4 4"/>
              <path d="M12 2v14"/>
            </svg>
            Compartilhar
          </button>
        </div>
      </footer>

      <div className="overlay" id="modal">
        <div className="stage">
          <button className="nav-btn nav-left" id="prevImg" type="button" title="Anterior">◀</button>
          <img alt="Imagem grande" id="modalImg"/>
          <button className="nav-btn nav-right" id="nextImg" type="button" title="Próxima">▶</button>
        </div>
      </div>
      <div className="toast" id="toast"></div>

      <aside className="panel" id="editor" aria-hidden="true">
        <div className="hd">
          <h3>Gerenciar</h3>
          <button className="btn ghost" id="closePanel" type="button">Fechar</button>
        </div>

        <div className="tabs">
          <button className="tab-btn active" data-tab="tab-colecoes" type="button">Coleções</button>
          <button className="tab-btn" data-tab="tab-backup" type="button">Backup</button>
        </div>

        <div className="body">
          <div className="panes">
            <div className="pane active" id="tab-colecoes">
              <div className="group">
                <h4>Criar/Excluir coleções</h4>
                <div className="stack">
                  <label>Nova coleção</label>
                  <input id="serieNome" placeholder="ex.: HW Art Cars"/>
                  <button className="btn" id="addSerie" type="button">Adicionar coleção</button>
                </div>
                <div className="stack" style={{marginTop:10}}>
                  <label>Selecionar coleção para gerenciar</label>
                  <select id="serieSel"></select>
                  <div className="tiny">A lista principal exibe sempre todas as coleções. Este seletor define onde adicionar/excluir.</div>
                  <button className="btn ghost" id="delSerie" type="button">Excluir coleção</button>
                </div>
              </div>

              <div className="group">
                <h4>Itens da coleção</h4>
                <div className="stack">
                  <label>Adicionar item à coleção selecionada</label>
                  <input id="itemNumero" placeholder="número (ex.: 01/10) ou 1/10, 1, etc."/>
                  <input id="itemNome" placeholder="modelo (ex.: DMC DeLorean)"/>
                  <input id="itemImg" placeholder="URL da imagem (https://...)"/>
                  <button className="btn" id="addItem" type="button">Adicionar item</button>
                </div>

                <div className="stack" style={{marginTop:10}}>
                  <label>Pré-visualização (clique em Editar para alterar rapidamente)</label>
                  <div className="list" id="itensPreview" style={{maxHeight:'40vh',overflow:'auto'}}></div>
                  <div className="tiny">Ordena por número (1 → 999). Sem número: vão ao fim por ordem alfabética.</div>
                </div>
              </div>
            </div>

            <div className="pane" id="tab-backup">
              <div className="group">
                <h4>Exportar</h4>
                <div className="stack">
                  <button className="btn" id="panelExport" type="button">Exportar agora</button>
                  <div className="tiny">Baixa um <code>.json</code> com coleções, itens e marcados. Nome: <code>hotlist-backup-AAAAMMDD.json</code>.</div>
                </div>
              </div>

              <div className="group">
                <h4>Importar</h4>
                <div className="stack">
                  <div className="file">
                    <label className="fake" htmlFor="importFile">Escolher arquivo (.json)</label>
                    <input id="importFile" type="file" accept="application/json"/>
                    <div className="opts">
                      <label className="tiny"><input type="radio" name="mergeMode" value="merge" defaultChecked/> Mesclar</label>
                      <label className="tiny"><input type="radio" name="mergeMode" value="replace"/> Substituir tudo</label>
                    </div>
                  </div>
                  <div className="tiny" id="importSummary"></div>
                  <div className="row actions">
                    <button className="btn" id="applyImport" type="button" disabled>Aplicar importação</button>
                    <button className="btn ghost" id="clearImport" type="button">Limpar seleção</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </aside>
    </>
  )
}