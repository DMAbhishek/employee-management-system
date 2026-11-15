package com.employee.management.security;
import com.employee.management.repository.UserRepository; import com.employee.management.entity.User;
import io.jsonwebtoken.Claims; import io.jsonwebtoken.Jwts; import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain; import jakarta.servlet.ServletException; import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Value; import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder; import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component; import org.springframework.web.filter.OncePerRequestFilter;
import javax.crypto.SecretKey; import java.io.IOException; import java.nio.charset.StandardCharsets;
@Component public class JwtAuthenticationFilter extends OncePerRequestFilter {
 private final UserRepository users; private final SecretKey key;
 public JwtAuthenticationFilter(UserRepository u,@Value("${jwt.secret}") String secret){users=u;key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));}
 protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain)throws ServletException,IOException{
  String header=request.getHeader("Authorization");
  if(header!=null&&header.startsWith("Bearer ")){try{Claims c=Jwts.parser().verifyWith(key).build().parseSignedClaims(header.substring(7)).getPayload();String username=c.getSubject();users.findByUsername(username).filter(User::isActive).ifPresent(u->{var auth=new UsernamePasswordAuthenticationToken(u.getUsername(),null,java.util.List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_"+u.getRole().name())));auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));SecurityContextHolder.getContext().setAuthentication(auth);});}catch(Exception ignored){}}
  chain.doFilter(request,response);
 }
}
