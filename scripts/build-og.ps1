# Regenerate the checked-in social card on Windows. No build-time dependency.
Add-Type -AssemblyName System.Drawing
$destination = Join-Path $PSScriptRoot '..\public\og\frontory.png'
[IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($destination)) | Out-Null
$bitmap = New-Object Drawing.Bitmap 1200,630
$graphics = [Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$cream = [Drawing.ColorTranslator]::FromHtml('#f6f7f9')
$green = New-Object Drawing.SolidBrush ([Drawing.ColorTranslator]::FromHtml('#176b56'))
$dark = New-Object Drawing.SolidBrush ([Drawing.ColorTranslator]::FromHtml('#182c32'))
$muted = New-Object Drawing.SolidBrush ([Drawing.ColorTranslator]::FromHtml('#52646b'))
$white = New-Object Drawing.SolidBrush ([Drawing.Color]::White)
$brand = New-Object Drawing.Font 'Segoe UI',76,([Drawing.FontStyle]::Bold),([Drawing.GraphicsUnit]::Pixel)
$label = New-Object Drawing.Font 'Segoe UI',30,([Drawing.FontStyle]::Regular),([Drawing.GraphicsUnit]::Pixel)
$small = New-Object Drawing.Font 'Segoe UI',24,([Drawing.FontStyle]::Regular),([Drawing.GraphicsUnit]::Pixel)
try {
  $graphics.Clear($cream)
  $graphics.FillRectangle($green,0,0,16,630)
  $graphics.FillRectangle($green,80,76,80,80)
  $graphics.FillRectangle($white,101,94,43,10)
  $graphics.FillRectangle($white,101,94,11,49)
  $graphics.FillRectangle($white,101,114,34,10)
  $graphics.DrawString('Frontory',$brand,$dark,72,206)
  $graphics.DrawString('Learn. Experiment. Archive.',$label,$green,80,318)
  $graphics.DrawString('Frontend learning through hands-on experiments',$small,$muted,80,399)
  $graphics.DrawString('frontory.pages.dev',$small,$muted,80,532)
  $bitmap.Save($destination,[Drawing.Imaging.ImageFormat]::Png)
} finally {
  $graphics.Dispose(); $bitmap.Dispose()
  $green.Dispose(); $dark.Dispose(); $muted.Dispose(); $white.Dispose()
  $brand.Dispose(); $label.Dispose(); $small.Dispose()
}
