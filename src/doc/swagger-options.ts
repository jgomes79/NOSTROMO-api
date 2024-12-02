import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Nostromo API')
  .setDescription(
    'Nostromo API serves as a comprehensive gateway, facilitating interactions across various services including project management, user authentication, and action handling.',
  )
  .setVersion(process.env.VERSION || '1.0') // Defaulting to '1.0' if process.env.VERSION is undefined
  .addSecurity('authenticationCookie', {
    type: 'apiKey',
    in: 'cookie' as const, // Explicitly set the type as 'const'
    name: 'Authentication',
  })
  .addSecurityRequirements('authenticationCookie')
  .build();
