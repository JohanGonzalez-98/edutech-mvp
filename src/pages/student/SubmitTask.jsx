import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TASKS, getSubject } from '../../data/mockData';
import { PageHead, EmptyState } from '../../components/ui';

const MAX_MB = 10;
const ALLOWED = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'zip', 'jpg', 'png'];

// Historia de Usuario 4 (ET004): entrega de actividades con carga "arrastrar y soltar".
// Valida: archivo adjunto, extensión permitida y tamaño máximo. Genera comprobante con fecha/hora.
export default function SubmitTask() {
  const { id } = useParams();
  const task = TASKS.find((t) => t.id === id);
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [over, setOver] = useState(false);
  const [receipt, setReceipt] = useState(null);

  if (!task) return <EmptyState icon="🔍" title="Actividad no encontrada" />;
  const subject = getSubject(task.subjectId);

  const validateFile = (f) => {
    const ext = f.name.split('.').pop().toLowerCase();
    if (!ALLOWED.includes(ext)) return `Extensión .${ext} no permitida. Usa: ${ALLOWED.join(', ')}.`;
    if (f.size > MAX_MB * 1024 * 1024) return `El archivo supera el límite de ${MAX_MB} MB.`;
    return null;
  };

  const pick = (f) => {
    if (!f) return;
    const err = validateFile(f);
    if (err) { setError(err); setFile(null); return; }
    setError(null);
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setOver(false);
    pick(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = () => {
    if (!file) { setError('Debes adjuntar un archivo antes de enviar.'); return; }
    // Comprobante de entrega con fecha y hora (RQNF012).
    const now = new Date();
    setReceipt({ name: file.name, size: (file.size / 1024).toFixed(0), when: now.toLocaleString('es-CO') });
  };

  if (receipt) {
    return (
      <>
        <PageHead title="¡Entrega exitosa!" subtitle={`${subject.nombre} · ${task.titulo}`} />
        <div className="receipt mb">
          <span style={{ fontSize: '1.8rem' }}>✅</span>
          <div>
            <strong>Tu actividad fue enviada correctamente</strong>
            <p style={{ fontSize: '.88rem', marginTop: 4 }}>
              Archivo: <strong>{receipt.name}</strong> ({receipt.size} KB)<br />
              Fecha y hora de entrega: <strong>{receipt.when}</strong>
            </p>
          </div>
        </div>
        <div className="flex gap">
          <Link to={`/estudiante/tarea/${task.id}`} className="btn btn-primary">Ver actividad</Link>
          <button className="btn btn-outline" onClick={() => { setReceipt(null); setFile(null); }}>Modificar entrega</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Link to={`/estudiante/tarea/${task.id}`} className="text-muted" style={{ fontSize: '.9rem' }}>← Volver a la actividad</Link>
      <PageHead title="Subir entrega" subtitle={`${subject.nombre} · ${task.titulo}`} />

      {error && <div className="alert alert-danger mb" role="alert"><span>⚠️</span><span>{error}</span></div>}

      <div
        className={'dropzone' + (over ? ' over' : '')}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        role="button" tabIndex={0}
      >
        <div className="dz-icon">{file ? '📄' : '☁️'}</div>
        {file
          ? <p><strong>{file.name}</strong> · {(file.size / 1024).toFixed(0)} KB</p>
          : <p>Arrastra y suelta tu archivo aquí, o <strong>haz clic para seleccionar</strong></p>}
        <small className="text-muted">Formatos: {ALLOWED.join(', ')} · Máx. {MAX_MB} MB</small>
        <input
          ref={inputRef} type="file" hidden
          onChange={(e) => pick(e.target.files?.[0])}
          accept={ALLOWED.map((e) => '.' + e).join(',')}
        />
      </div>

      <div className="flex gap mt-lg">
        <button className="btn btn-primary" onClick={handleSubmit} disabled={!file}>Enviar actividad</button>
        {file && <button className="btn btn-outline" onClick={() => setFile(null)}>Quitar archivo</button>}
      </div>
    </>
  );
}
